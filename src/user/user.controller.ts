import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';



@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	async findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.userService.findById(id);
	}
}
