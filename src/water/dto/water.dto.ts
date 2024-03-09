import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { LicenseType, Prisma, WaterType } from '@prisma/client'

@InputType({ description: 'Order `Water` by single or multiple fields. The order of sorting parameters matters. Supported values: `asc | desc`' })
export class WaterOrder implements Prisma.WaterOrderByWithRelationInput {
	@Field({ nullable: true })
	title?: Prisma.SortOrder

	@Field({ nullable: true })
	visitorPrice?: Prisma.SortOrder

	@Field({ nullable: true })
	memberPrice?: Prisma.SortOrder
}

registerEnumType(WaterType, {
	name: 'WaterTypes',
	description: 'Supported values',
	valuesMap: {
		lake: {
			description: 'lake',
		},
		river: {
			description: 'river',
		},
		stream: {
			description: 'stream',
		},
	},
})

registerEnumType(LicenseType, {
	name: 'LicenseType',
	description: 'Supported values',
	valuesMap: {
		carp: {
			description: 'carp',
		},
		grayling: {
			description: 'grayling',
		},
		hucho: {
			description: 'hucho',
		},
		trout: {
			description: 'trout',
		},
	},
})
