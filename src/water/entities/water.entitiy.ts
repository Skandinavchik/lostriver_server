import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { LicenseType, Organization, Water, WaterType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { OrganizationEntity } from '../../organization/entities/organization.entity'


@ObjectType()
export class WaterEntity implements Water {
	@Field(() => ID)
	id: string

	@Field()
	serialNumber: string

	@Field()
	title: string

	@Field()
	cover: string

	@Field()
	organizationId: string

	@Field(() => OrganizationEntity)
	organization: Organization

	@Field(() => Int)
	visitorPrice: Decimal

	@Field(() => Int)
	memberPrice: Decimal

	@Field(() => WaterType)
	waterType: WaterType

	@Field(() => [LicenseType])
	licenseType: LicenseType[]

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}