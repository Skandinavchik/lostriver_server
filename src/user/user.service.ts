import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) { };

	async findAll() {
		const users = await this.prismaService.user.findMany();

		if (users.length === 0) {
			throw new NotFoundException('No users');
		}

		return this.removePassword(users);
	};

	async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			throw new NotFoundException('User with this ID not found');
		}

		return this.removePassword(user);
	};

	removePassword(userOrUsers: User | User[]) {
		if (!Array.isArray(userOrUsers)) {
			const { password, ...userWithoutPassword } = userOrUsers;
			return userWithoutPassword;
		}

		const arrayOfUsersWithoutPassword: Omit<User, 'password'>[] = [];

		for (let i = 0; i < userOrUsers.length; i++) {
			const { password, ...userWithoutPassword } = userOrUsers[i];
			arrayOfUsersWithoutPassword.push(userWithoutPassword);
		}

		return arrayOfUsersWithoutPassword;
	};
}