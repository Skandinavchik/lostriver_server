import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';



@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
