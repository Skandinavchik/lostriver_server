import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateWaterDto } from './dto/create-water.dto'
import { UpdateWaterDto } from './dto/update-water.dto'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { LicenseType, WaterType } from '@prisma/client'
import { GetWatersArgs } from './dto/get-waters.dto'

@Injectable()
export class WaterService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createWaterDto: CreateWaterDto) {
    try {
      const water = await this.prismaService.water.create({
        data: createWaterDto,
        include: {
          organization: true,
        },
      })

      return { water }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException('Water already exists')
      }
    }
  }

  async getMany(args: GetWatersArgs) {
    try {
      const { q, order, wtypes, ltypes, take, skip } = args
      const totalResults = await this.prismaService.water.count()
      const waters = await this.prismaService.water.findMany({
        where: {
          OR: [
            {
              title: {
                contains: q,
                mode: 'insensitive',
              },
            },
            {
              serialNumber: {
                contains: q,
              },
            },
            {
              organization: {
                title: {
                  contains: q,
                  mode: 'insensitive',
                },
              },
            },
          ],
          waterType: {
            in: wtypes && wtypes.length ? wtypes : Object.values(WaterType),
          },
          licenseType: {
            hasSome:
              ltypes && ltypes.length ? ltypes : Object.values(LicenseType),
          },
        },
        include: {
          organization: true,
        },
        orderBy: order,
        take,
        skip,
      })

      return {
        totalResults,
        currentResults: waters.length,
        waters,
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        throw new Error()
      }
    }
  }

  async getById(id: string) {
    try {
      const water = await this.prismaService.water.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          organization: true,
        },
      })

      return { water }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('Water not found')
      }
    }
  }

  async update(id: string, updateWaterDto: UpdateWaterDto) {
    try {
      const water = await this.prismaService.water.update({
        where: {
          id,
        },
        data: updateWaterDto,
        include: {
          organization: true,
        },
      })

      return { water }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('Water not found')
      }
    }
  }

  async remove(id: string) {
    try {
      const water = await this.prismaService.water.delete({
        where: {
          id,
        },
        include: {
          organization: true,
        },
      })

      return { water }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('Water not found')
      }
    }
  }
}
