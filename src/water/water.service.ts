import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WaterDto } from './dto/water.dto';
import { Request } from 'express';
import { IReqQueryObject } from './types/water.type';


@Injectable()
export class WaterService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(waterDto: WaterDto) {
		const water = await this.prismaService.water.create({
			data: waterDto,
			include: {
				organization: true,
			},
		});

		return water;
	};

	async findAll(req: Request) {

		const { q, sort, org }: IReqQueryObject = req.query;

		const waters = await this.prismaService.water.findMany({
			where: {
				title: {
					contains: q,
					mode: 'insensitive',
				},
				organizationId: {
					in: org ? org.split(',') : undefined,
				},
			},
			include: {
				organization: true,
			},
			orderBy: {
				visitorPrice: sort
			},
		});

		if (!waters.length) {
			return {
				message: 'No waters',
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