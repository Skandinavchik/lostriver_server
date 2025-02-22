import { Field, ObjectType } from '@nestjs/graphql'
import { Water } from '@prisma/client'
import { IsDate, IsString, IsUUID, Length, Matches } from 'class-validator'

@ObjectType()
export class WaterEntity implements Water {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @IsString()
  @Matches(/^\d-\d{4}-\d-\d$/, {
    message: 'serialNumber must be in the format \'1-2345-6-7\'',
  })
  serialNumber: string

  @Field()
  @IsString()
  @Length(3, 50)
  title: string

  @Field()
  @IsString()
  description: string

  @Field(() => Date)
  @IsDate()
  createdAt: Date

  @Field(() => Date)
  @IsDate()
  updatedAt: Date
}
