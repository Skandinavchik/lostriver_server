import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';


const corsOptions: CorsOptions = {
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type'],
	credentials: true,
};
const port = process.env.PORT;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors(corsOptions);
	app.setGlobalPrefix('api');

	await app.listen(port);
}

bootstrap();
