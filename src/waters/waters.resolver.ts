import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { WatersService } from './waters.service'
import { WaterEntity } from './entities/water.entity'
import { CreateWaterDto } from './dto/create-water.dto'
import { UpdateWaterDto } from './dto/update-water.dto'


@Resolver(() => WaterEntity)
export class WatersResolver {
	constructor(private readonly watersService: WatersService) { }

	@Mutation(() => WaterEntity)
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
	async removeWater(@Args('id', { type: () => Int }) id: number) {
		return this.watersService.remove(id)
	}
}
