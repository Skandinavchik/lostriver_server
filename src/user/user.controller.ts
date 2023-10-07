import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';
import { User } from '@prisma/client';



@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	async findAll(): Promise<Omit<User, 'password'>[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<Omit<User, 'password'>> {
		return this.userService.findById(id);
	}
}
