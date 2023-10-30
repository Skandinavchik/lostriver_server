import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizationDto } from './dto/organization.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class OrganizationService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(organizationDto: OrganizationDto) {
		try {
			const newOrganization = await this.prismaService.organization.create({
				data: {
					title: organizationDto.title,
				},
			});

			return newOrganization;

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new ConflictException('Organization with this title already exists');
			}
		}
	}

	async findAll() {
		const organizations = await this.prismaService.organization.findMany();

		if (!organizations.length) {
			return {
				message: 'No organizations',
			};
		}

		return organizations;
	}

	async findById(id: string) {
		const organization = await this.prismaService.organization.findUnique({
			where: {
				id,
			},
			include: {
				waters: true,
			},
		});

		if (!organization) {
			throw new NotFoundException('Organization with this ID not found');
		}

		return organization;
	}
}
