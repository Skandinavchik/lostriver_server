import { InputType, Field, PartialType, OmitType, Float } from '@nestjs/graphql'
import { $Enums } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { WaterEntity } from '../entities/water.entitiy'
import { IsEnum, IsUrl, Matches, Max, Min } from 'class-validator'

@InputType()
export class CreateWaterDto extends PartialType(
	OmitType(WaterEntity, ['id', 'organization', 'createdAt', 'updatedAt'])
) {
	@Field()
	@Matches(/^\d{1}-\d{4}-\d{1}-\d{1}$/, {
		message: 'Serial number should match format: `1-1234-1-1`'
	})
	serialNumber: string

	@Field()
	title: string

	@Field()
	@IsUrl({ allow_underscores: true }, {
		message: 'Cover should be a valid URL'
	})
	cover: string

	@Field()
	organizationId: string

	@Field(() => Float)
	@Min(0, {
		message: 'Minimum price is 0'
	})
	@Max(0, {
		message: 'Maximum price is 999.99'
	})
	visitorPrice: Decimal

	@Field(() => Float)
	@Min(0, {
		message: 'Minimum price is 0'
	})
	@Max(0, {
		message: 'Maximum price is 999.99'
	})
	memberPrice: Decimal

	@Field()
	@IsEnum($Enums.WaterType, {
		message: 'Water type should be one of: `stream | river | lake`'
	})
	waterType: $Enums.WaterType

	@Field(() => [String])
	@IsEnum($Enums.LicenseType, {
		each: true,
		message: 'License type should be one or several of: `carp | grayling | hucho | trout`'
	})
	licenseType: $Enums.LicenseType[]
}
