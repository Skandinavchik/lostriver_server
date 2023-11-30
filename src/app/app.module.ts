import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { OrganizationsModule } from 'src/organizations/organizations.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { WatersModule } from 'src/waters/waters.module'


@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'schema.gql',
			useGlobalPrefix: true,
		}),
		ConfigModule,
		PrismaModule,
		WatersModule,
		OrganizationsModule
	],
	controllers: [],
	providers: [],
})

export class AppModule { }