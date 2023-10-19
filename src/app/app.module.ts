import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { OrganizationModule } from 'src/organization/organization.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { WaterModule } from 'src/water/water.module';


@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
		AuthModule,
		UserModule,
		OrganizationModule,
		WaterModule,
	],
	controllers: [],
	providers: [],
})

export class AppModule { }