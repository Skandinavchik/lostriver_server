import { CreateOrganizationDto } from './create-organization.dto'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {

}
