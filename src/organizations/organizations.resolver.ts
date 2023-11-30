import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { OrganizationsService } from './organizations.service'
import { OrganizationEntity } from './entities/organization.entity'
import { CreateOrganizationInput } from './dto/create-organization.input'
import { UpdateOrganizationInput } from './dto/update-organization.input'

@Resolver(() => OrganizationEntity)
export class OrganizationsResolver {
	constructor(private readonly organizationsService: OrganizationsService) { }

	@Mutation(() => OrganizationEntity)
	createOrganization(@Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput) {
		return this.organizationsService.create(createOrganizationInput)
	}

	@Query(() => [OrganizationEntity], { name: 'organizations' })
	findAll() {
		return this.organizationsService.findAll()
	}

	@Query(() => OrganizationEntity, { name: 'organization' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.organizationsService.findOne(id)
	}

	@Mutation(() => OrganizationEntity)
	updateOrganization(@Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput) {
		return this.organizationsService.update(updateOrganizationInput.id, updateOrganizationInput)
	}

	@Mutation(() => OrganizationEntity)
	removeOrganization(@Args('id', { type: () => Int }) id: number) {
		return this.organizationsService.remove(id)
	}
}
