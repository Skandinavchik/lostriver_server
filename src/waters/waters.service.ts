import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateWaterDto } from './dto/create-water.dto'
import { UpdateWaterDto } from './dto/update-water.dto'
import { PrismaService } from '../prisma/prisma.service'
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

			return water

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new ConflictException('Water already exists')
			}
		}
	}

	async getAll(): Promise<WaterEntity[]> {
		try {
			const waters = await this.prismaService.water.findMany({
				include: {
					organization: true,
				}
			})

			return waters

		} catch (error) {
			if (error instanceof Error) {
				throw new Error()
			}
		}
	}

	async getById(id: string): Promise<WaterEntity> {
		try {
			const water = await this.prismaService.water.findUniqueOrThrow({
				where: {
					id,
				},
				include: {
					organization: true
				}
			})

			return water

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new NotFoundException('Water not found')
			}
		}
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

	async remove(id: string): Promise<WaterEntity> {
		try {
			const removedWater = await this.prismaService.water.delete({
				where: {
					id
				},
				include: {
					organization: true
				}
			})

			return removedWater

		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new NotFoundException('Water not found')
			}
		}
	}
}
