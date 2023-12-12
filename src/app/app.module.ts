import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { OrganizationModule } from 'src/organization/organization.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { WaterModule } from 'src/water/water.module'


@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'schema.gql',
			useGlobalPrefix: true,
			formatError: (error: GraphQLError) => {
				const { stacktrace, ...restExtentions } = error.extensions
				const graphQLFormattedError: GraphQLFormattedError = {
					message: error.message,
					path: error.path,
					extensions: restExtentions
				}
				return graphQLFormattedError
			}
		}),
		ConfigModule,
		PrismaModule,
		WaterModule,
		OrganizationModule
	],
	controllers: [],
	providers: [],
})

export class AppModule { }