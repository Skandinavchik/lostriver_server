import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { WatersService } from './waters.service'
import { WaterEntity } from './entities/water.entity'
import { CreateWaterDto } from './dto/create-water.dto'
import { UpdateWaterDto } from './dto/update-water.dto'
import { UsePipes, ValidationPipe } from '@nestjs/common'


@Resolver(() => WaterEntity)
export class WatersResolver {
	constructor(private readonly watersService: WatersService) { }

	@Mutation(() => WaterEntity)
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async createWater(@Args('dto') createWaterDto: CreateWaterDto): Promise<WaterEntity> {
		return this.watersService.create(createWaterDto)
	}

	@Query(() => [WaterEntity])
	async getAllWaters(): Promise<WaterEntity[]> {
		return this.watersService.getAll()
	}

	@Query(() => WaterEntity)
	async getWaterById(@Args('id') id: string): Promise<WaterEntity> {
		return this.watersService.getById(id)
	}

	@Mutation(() => WaterEntity)
	async updateWater(
		@Args('id') id: string,
		@Args('dto') updateWaterDto: UpdateWaterDto
	): Promise<WaterEntity> {
		return this.watersService.update(id, updateWaterDto)
	}

	@Mutation(() => WaterEntity)
	async removeWater(@Args('id') id: string): Promise<WaterEntity> {
		return this.watersService.remove(id)
	}
}
