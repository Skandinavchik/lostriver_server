import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql'
import { OrganizationEntity } from '../entities/organization.entity'

@InputType()
export class CreateOrganizationDto extends PartialType(
	OmitType(OrganizationEntity, ['id', 'waters', 'createdAt', 'updatedAt'])
) {
	@Field()
	title: string
}
