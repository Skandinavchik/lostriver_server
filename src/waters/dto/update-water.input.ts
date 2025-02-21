import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateWaterInput } from './create-water.input'

@InputType()
export class UpdateWaterInput extends PartialType(CreateWaterInput) {
  @Field(() => Int)
  id: number
}
