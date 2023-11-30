import { InputType, Field, PartialType, OmitType, Float } from '@nestjs/graphql'
import { $Enums } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { WaterEntity } from '../entities/water.entity'

@InputType()
export class CreateWaterDto extends PartialType(
	OmitType(WaterEntity, ['id', 'organization', 'createdAt', 'updatedAt'])
) {
	@Field()
	serialNumber: string

	@Field()
	title: string

	@Field()
	cover: string

	@Field()
	organizationId: string

	@Field(() => Float)
	visitorPrice: Decimal

	@Field(() => Float)
	memberPrice: Decimal

	@Field()
	waterType: $Enums.WaterType

	@Field(() => [String])
	licenseType: $Enums.LicenseType[]
}
