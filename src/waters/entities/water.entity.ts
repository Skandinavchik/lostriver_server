import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Water {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
