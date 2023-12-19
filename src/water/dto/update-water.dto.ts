import { CreateWaterDto } from './create-water.dto'
import { InputType, PartialType, OmitType } from '@nestjs/graphql'

@InputType()
export class UpdateWaterDto extends PartialType(
	OmitType(CreateWaterDto, [])
) { }
