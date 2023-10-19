import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WaterDto } from './dto/water.dto';


@Injectable()
export class WaterService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(waterDto: WaterDto) {
		const water = await this.prismaService.water.create({
			data: {
				title: waterDto.title,
				organizationId: waterDto.organizationId,
			},
			include: {
				organization: true,
			},
		});

		return water;
	};

	async findAll() {
		const waters = await this.prismaService.water.findMany({
			include: {
				organization: true,
			}
		});

		if (!waters.length) {
			return {
				message: 'No waters'
			};
		}

		return waters;
	};

	async findById(id: string) {
		const water = await this.prismaService.water.findUnique({
			where: {
				id,
			},
			include: {
				organization: true,
			}
		});

		if (!water) {
			throw new NotFoundException('Water with this ID not found');
		}

		return water;
	};
}