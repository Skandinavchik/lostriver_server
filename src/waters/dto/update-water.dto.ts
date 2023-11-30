import { CreateWaterDto } from './create-water.dto'
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql'

@InputType()
export class UpdateWaterDto extends PartialType(OmitType(CreateWaterDto, ['organizationId'])) {

}
