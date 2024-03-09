import { ArgsType, Field, Int } from '@nestjs/graphql'
import { WaterOrder } from './water.dto'
import { LicenseType, WaterType } from '@prisma/client'

@ArgsType()
export class GetWatersArgs {
	@Field({
		name: 'q',
		nullable: true,
	})
	q?: string

	@Field(() => [WaterOrder], {
		name: 'order',
		nullable: true,
	})
	order?: WaterOrder[]

	@Field(() => [WaterType], {
		name: 'wtypes',
		nullable: true,
	})
	wtypes?: WaterType[]

	@Field(() => [LicenseType], {
		name: 'ltypes',
		nullable: true,
	})
	ltypes?: LicenseType[]

	@Field(() => Int, {
		name: 'take',
		nullable: true,
		defaultValue: 100,
	})
	take?: number

	@Field(() => Int, {
		name: 'skip',
		nullable: true,
		defaultValue: 0,
	})
	skip?: number
}
