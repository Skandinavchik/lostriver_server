import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { WaterService } from './water.service'
import { WaterEntity } from './entities/water.entitiy'
import { CreateWaterDto } from './dto/create-water.dto'
import { UpdateWaterDto } from './dto/update-water.dto'
import { DefaultValuePipe, ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common'
import { WatersResponse, SingleWaterResponse } from './entities/water-response.entity'
import { WaterOrder } from './dto/water.dto'
import { WaterArgs } from './types/water.type'
import { LicenseType, WaterType } from '@prisma/client'


@Resolver(() => WaterEntity)
export class WaterResolver {
	constructor(private readonly waterService: WaterService) { }


	@Mutation(() => SingleWaterResponse)
	@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
	async createWater(@Args('dto') createWaterDto: CreateWaterDto): Promise<SingleWaterResponse> {
		return this.waterService.create(createWaterDto)
	}


	@Query(() => WatersResponse, { name: 'waters' })
	async getWaters(
		@Args('q', { nullable: true }) q?: string,

		@Args('order', {
			type: () => [WaterOrder],
			nullable: true
		}) order?: WaterOrder[],

		@Args('wtypes', {
			type: () => [WaterType],
			nullable: true,
		}) wtypes?: WaterType[],

		@Args('ltypes', {
			type: () => [LicenseType],
			nullable: true
		}) ltypes?: LicenseType[]

	): Promise<WatersResponse> {
		const args: WaterArgs = { q, order, wtypes, ltypes }
		return this.waterService.getMany(args)
	}


	@Query(() => SingleWaterResponse, { name: 'water' })
	async getWaterById(@Args('id') id: string): Promise<SingleWaterResponse> {
		return this.waterService.getById(id)
	}


	@Mutation(() => SingleWaterResponse)
	@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
	async updateWater(
		@Args('id') id: string,
		@Args('dto') updateWaterDto: UpdateWaterDto
	): Promise<SingleWaterResponse> {
		return this.waterService.update(id, updateWaterDto)
	}


	@Mutation(() => SingleWaterResponse)
	async removeWater(@Args('id') id: string): Promise<SingleWaterResponse> {
		return this.waterService.remove(id)
	}
}
