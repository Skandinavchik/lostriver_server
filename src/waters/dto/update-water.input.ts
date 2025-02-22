import { InputType, PartialType } from '@nestjs/graphql'
import { CreateWaterInput } from './create-water.input'

@InputType()
export class UpdateWaterInput extends PartialType(CreateWaterInput) {
  id: string
}
