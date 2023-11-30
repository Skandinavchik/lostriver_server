import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateWaterDto } from './dto/create-water.dto'
import { UpdateWaterDto } from './dto/update-water.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { WaterEntity } from './entities/water.entity'


@Injectable()
export class WatersService {
	constructor(private readonly prismaService: PrismaService) { }

	async create(createWaterDto: CreateWaterDto): Promise<WaterEntity> {
		try {
			const water = await this.prismaService.water.create({
				data: createWaterDto,
				include: {
					organization: true
				}
			})
			console.log(water)

			return water
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new ConflictException('Water already exists')
			}
		}
	}

	async getAll(): Promise<WaterEntity[]> {
		const waters = await this.prismaService.water.findMany({
			include: {
				organization: true,
			}
		})
		return waters
	}

	async getById(id: string): Promise<WaterEntity> {
		const water = await this.prismaService.water.findUnique({
			where: {
				id,
			},
			include: {
				organization: true
			}
		})

		if (!water) {
			throw new NotFoundException('Water Not found')
		}

		return water
	}

	async update(id: string, updateWaterDto: UpdateWaterDto): Promise<WaterEntity> {
		try {
			const updatedWater = await this.prismaService.water.update({
				where: {
					id
				},
				data: updateWaterDto,
				include: {
					organization: true,
				}
			})

			return updatedWater

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new NotFoundException('Water not found')
			}
		}
	}

	async remove(id: number) {
		return `This action removes a #${id} water`
	}
}
