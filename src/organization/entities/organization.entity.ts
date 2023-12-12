import { ObjectType, Field } from '@nestjs/graphql'
import { Organization, Water } from '@prisma/client'
import { WaterEntity } from '../../water/entities/water.entitiy'

@ObjectType()
export class OrganizationEntity implements Organization {
	@Field()
	id: string

	@Field()
	title: string

	@Field(() => [WaterEntity])
	waters: Water[]

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
