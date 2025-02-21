import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateWaterInput } from './dto/create-water.input'
import { UpdateWaterInput } from './dto/update-water.input'
import { Water } from './entities/water.entity'
import { WatersService } from './waters.service'

@Resolver(() => Water)
export class WatersResolver {
  constructor(private readonly watersService: WatersService) {}

  @Mutation(() => Water)
  createWater(@Args('createWaterInput') createWaterInput: CreateWaterInput) {
    return this.watersService.create(createWaterInput)
  }

  @Query(() => [Water], { name: 'waters' })
  findAll() {
    return this.watersService.findAll()
  }

  @Query(() => Water, { name: 'water' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.watersService.findOne(id)
  }

  @Mutation(() => Water)
  updateWater(@Args('updateWaterInput') updateWaterInput: UpdateWaterInput) {
    return this.watersService.update(updateWaterInput.id, updateWaterInput)
  }

  @Mutation(() => Water)
  removeWater(@Args('id', { type: () => Int }) id: number) {
    return this.watersService.remove(id)
  }
}
