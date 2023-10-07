import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { genSalt, hash, compare } from 'bcrypt';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { IRes, IAccessToken } from './types/auth.types';
import { Response } from 'express';



@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) { }

	async signUp(res: Response, { username, email, password }: SignUpDto): Promise<IRes> {
		const userExists = await this.prismaService.user.findUnique({
			where: {
				email,
			}
		});

		if (userExists) {
			throw new BadRequestException('User with this email already exists');
		}

		const salt = await genSalt(12);
		const user = await this.prismaService.user.create({
			data: {
				username,
				email,
				password: await hash(password, salt),
			},
		});

		res.cookie('accessToken', (await this.signAccessToken(user)).accessToken, {
			maxAge: 14 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return {
			message: 'User signed up'
		};

	}

	async signIn(res: Response, { email, password }: SignInDto): Promise<IRes> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			}
		});

		if (user) {
			const isCorrectPassword = await compare(password, user.password);

			if (isCorrectPassword) {
				res.cookie('accessToken', (await this.signAccessToken(user)).accessToken, {
					maxAge: 14 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});

				return {
					message: 'User signed in'
				};
			}
		}

		throw new UnauthorizedException('Invalid email or password');
	}

	async signOut(res: Response): Promise<IRes> {
		res.clearCookie('accessToken', {
			maxAge: 10,
			httpOnly: true,
		});

		return {
			message: 'User signed out',
		};
	}

	async signAccessToken({ id, email, username }: User): Promise<IAccessToken> {
		const accessToken = await this.jwtService.signAsync({ email }, {
			subject: id,
			issuer: username,
		});

		return {
			accessToken,
		};
	}
}
