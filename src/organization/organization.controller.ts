import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationDto } from './dto/organization.dto';


@Controller('organizations')
export class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) { }

	@Post()
	@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
	async create(@Body() organizationDto: OrganizationDto) {
		return this.organizationService.create(organizationDto);
	}

	@Get()
	async findAll() {
		return this.organizationService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.organizationService.findById(id);
	}
}