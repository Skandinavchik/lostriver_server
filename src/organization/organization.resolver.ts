import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { OrganizationService } from './organization.service'
import { OrganizationEntity } from './entities/organization.entity'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'

@Resolver(() => OrganizationEntity)
export class OrganizationResolver {
	constructor(private readonly organizationService: OrganizationService) { }

	@Mutation(() => OrganizationEntity)
	createOrganization(@Args('dto') createOrganizationDto: CreateOrganizationDto) {
		return this.organizationService.create(createOrganizationDto)
	}

	@Query(() => [OrganizationEntity], { name: 'organizations' })
	findAll() {
		return this.organizationService.findAll()
	}

	@Query(() => OrganizationEntity, { name: 'organization' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.organizationService.findOne(id)
	}

	@Mutation(() => OrganizationEntity)
	updateOrganization(
		@Args('id') id: string,
		@Args('dto') updateOrganizationDto: UpdateOrganizationDto
	) {
		return this.organizationService.update(id, updateOrganizationDto)
	}

	@Mutation(() => OrganizationEntity)
	removeOrganization(@Args('id', { type: () => Int }) id: number) {
		return this.organizationService.remove(id)
	}
}
