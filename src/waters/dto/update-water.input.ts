import { Field, InputType, PartialType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'
import { CreateWaterInput } from './create-water.input'

@InputType()
export class UpdateWaterInput extends PartialType(CreateWaterInput) {
  @Field()
  @IsUUID()
  id: string
}
