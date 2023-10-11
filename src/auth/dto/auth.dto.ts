import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches } from 'class-validator';


export class SignInDto {

	@IsString()
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Password is required' })
	password: string;
}

export class SignUpDto {

	@IsString()
	@IsNotEmpty({ message: 'Username is required' })
	@MinLength(2, { message: 'Username must be at least 2 characters' })
	@MaxLength(20, { message: 'Username must not be greater than 20 characters' })
	username: string;

	@IsEmail({}, { message: 'Email must be valid' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	@Matches(/[a-z]/, { message: 'Password must contain at least one lowercase' })
	@Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase' })
	@Matches(/[0-9]/, { message: 'Password must contain at least one digit' })
	password: string;
}