import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { WaterService } from './water.service'
import { WaterEntity } from './entities/water.entitiy'
import { CreateWaterDto } from './dto/create-water.dto'
import { UpdateWaterDto } from './dto/update-water.dto'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { WatersResponse, SingleWaterResponse } from './entities/water-response.entity'
import { GetWatersArgs } from './dto/get-waters.dto'


@Resolver(() => WaterEntity)
export class WaterResolver {
  constructor(private readonly waterService: WaterService) { }


  @Mutation(() => SingleWaterResponse)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  async createWater(@Args('dto') createWaterDto: CreateWaterDto): Promise<SingleWaterResponse> {
    return this.waterService.create(createWaterDto)
  }


  @Query(() => WatersResponse, { name: 'waters' })
  async getWaters(@Args() args: GetWatersArgs): Promise<WatersResponse> {
    return this.waterService.getMany(args)
  }


  @Query(() => SingleWaterResponse, { name: 'water' })
  async getWaterById(@Args('serialNumber') serialNumber: string): Promise<SingleWaterResponse> {
    return this.waterService.getById(serialNumber)
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
