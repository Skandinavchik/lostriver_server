import { ObjectType, Field, Int } from '@nestjs/graphql'
import { $Enums, Organization, Water } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { OrganizationEntity } from 'src/organizations/entities/organization.entity'


@ObjectType()
export class WaterEntity implements Water {
	@Field()
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

	@Field()
	waterType: $Enums.WaterType

	@Field(() => [String])
	licenseType: $Enums.LicenseType[]

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
