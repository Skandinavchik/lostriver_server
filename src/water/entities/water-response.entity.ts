import { Field, Int, ObjectType } from '@nestjs/graphql'
import { WaterEntity } from './water.entitiy'


@ObjectType()
export class SingleWaterResponse {
	@Field(() => WaterEntity)
	water: WaterEntity
}

@ObjectType()
export class WatersResponse {
	@Field(() => Int)
	count: number

	@Field(() => [WaterEntity])
	waters: WaterEntity[]
}