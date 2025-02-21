import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateWaterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
