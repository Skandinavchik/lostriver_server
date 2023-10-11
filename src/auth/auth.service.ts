import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { genSalt, hash, compare } from 'bcrypt';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { IRes } from './types/auth.types';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) { }

	async signUp(res: Response, { username, email, password }: SignUpDto): Promise<IRes> {
		try {
			const salt = await genSalt(12);
			const user = await this.prismaService.user.create({
				data: {
					username,
					email,
					password: await hash(password, salt),
				},
			});

			res.cookie('accessToken', (await this.signAccessToken(user)), {
				maxAge: 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return {
				message: 'User signed up'
			};

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new ConflictException('User with this email already exists');
			}
		}
	}

	async signIn(res: Response, { email, password }: SignInDto): Promise<IRes> {
		const user = await this.validateUser({ email, password });
		const accessToken = await this.signAccessToken(user);

		res.cookie('accessToken', accessToken, {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return {
			message: 'User signed in'
		};

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

	async signAccessToken({ id, email, username }: User): Promise<string> {
		const accessToken = await this.jwtService.signAsync({ email }, {
			subject: id,
			issuer: username,
		});

		return accessToken;
	}

	async refreshToken() {

	}

	async validateUser({ email, password }: SignInDto): Promise<User> {
		const user = await this.prismaService.user.findUnique({
			where: { email }
		});

		if (user && (await compare(password, user.password))) {
			return user;
		}

		throw new UnauthorizedException('Invalid email or password');
	}
}
