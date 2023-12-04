import { Test } from '@nestjs/testing'
import { WatersService } from './waters.service'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ConflictException, NotFoundException } from '@nestjs/common'


class PrismaServiceMock {
	water = {
		create: jest.fn(),
		findMany: jest.fn(),
		findUniqueOrThrow: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	};
}

describe('WatersService', () => {
	const setupTestingModule = async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				WatersService,
				{
					provide: PrismaService,
					useClass: PrismaServiceMock,
				}
			]
		}).compile()

		const watersService = moduleRef.get<WatersService>(WatersService)
		const prismaService = moduleRef.get<PrismaServiceMock>(PrismaService)
		const prismaError = new PrismaClientKnownRequestError('error', {
			code: '',
			clientVersion: ''
		})

		return { prismaError, watersService, prismaService }
	}

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should be defined', async () => {
		const { watersService } = await setupTestingModule()
		expect(watersService).toBeDefined()
	})

	describe('create', () => {
		it('should create water', async () => {
			const { watersService, prismaService } = await setupTestingModule()
			const dto: any = {}
			const createdWater = { id: '1', title: 'title' }

			jest.spyOn(prismaService.water, 'create').mockResolvedValue(createdWater)

			await expect(watersService.create(dto)).resolves.toStrictEqual(createdWater)
			expect(prismaService.water.create).toHaveBeenCalled()
		})

		it('should throw a conflict exception', async () => {
			const dto: any = {}
			const { watersService, prismaService, prismaError } = await setupTestingModule()

			jest.spyOn(prismaService.water, 'create').mockRejectedValue(prismaError)

			await expect(watersService.create(dto)).rejects
				.toThrow(new ConflictException('Water already exists'))
			expect(prismaService.water.create).toHaveBeenCalled()
		})
	})

	describe('getAll', () => {
		it('should return all waters', async () => {
			const { watersService, prismaService } = await setupTestingModule()
			const waters = [
				{ id: '1', title: 'title1' },
				{ id: '2', title: 'title2' }
			]

			jest.spyOn(prismaService.water, 'findMany').mockResolvedValue(waters)

			await expect(watersService.getAll()).resolves.toStrictEqual(waters)
			expect(prismaService.water.findMany).toHaveBeenCalled()
		})

		it('should throw an error', async () => {
			const { watersService, prismaService } = await setupTestingModule()
			const error = new Error()

			jest.spyOn(prismaService.water, 'findMany').mockRejectedValue(error)

			await expect(watersService.getAll()).rejects.toThrow()
			expect(prismaService.water.findMany).toHaveBeenCalled()
		})
	})

	describe('getById', () => {
		it('should return a single water', async () => {
			const { watersService, prismaService } = await setupTestingModule()
			const water = { id: '1', title: 'title1' }

			jest.spyOn(prismaService.water, 'findUniqueOrThrow').mockResolvedValue(water)

			await expect(watersService.getById('1')).resolves.toStrictEqual(water)
			expect(prismaService.water.findUniqueOrThrow).toHaveBeenCalled()
		})

		it('should trow a not found exception', async () => {
			const { watersService, prismaService, prismaError } = await setupTestingModule()

			jest.spyOn(prismaService.water, 'findUniqueOrThrow').mockRejectedValue(prismaError)

			await expect(watersService.getById('1')).rejects
				.toThrow(new NotFoundException('Water not found'))
			expect(prismaService.water.findUniqueOrThrow).toHaveBeenCalled()
		})
	})

	describe('update', () => {
		it('should return updated water', async () => {
			const { watersService, prismaService } = await setupTestingModule()
			const water = { id: '1', title: 'title1' }

			jest.spyOn(prismaService.water, 'update').mockResolvedValue(water)

			await expect(watersService.update('1', water)).resolves.toStrictEqual(water)
			expect(prismaService.water.update).toHaveBeenCalled()
		})

		it('should trow a not found exception', async () => {
			const { watersService, prismaService, prismaError } = await setupTestingModule()
			const water = { id: '1', title: 'title1' }

			jest.spyOn(prismaService.water, 'update').mockRejectedValue(prismaError)

			await expect(watersService.update('1', water)).rejects
				.toThrow(new NotFoundException('Water not found'))
			expect(prismaService.water.update).toHaveBeenCalled()
		})
	})

	describe('remove', () => {
		it('should return removed water', async () => {
			const { watersService, prismaService } = await setupTestingModule()
			const water = { id: '1', title: 'title1' }

			jest.spyOn(prismaService.water, 'delete').mockResolvedValue(water)

			await expect(watersService.remove('1')).resolves.toStrictEqual(water)
			expect(prismaService.water.delete).toHaveBeenCalled()
		})

		it('should trow a not found exception', async () => {
			const { watersService, prismaService, prismaError } = await setupTestingModule()

			jest.spyOn(prismaService.water, 'delete').mockRejectedValue(prismaError)

			await expect(watersService.remove('1')).rejects
				.toThrow(new NotFoundException('Water not found'))
			expect(prismaService.water.delete).toHaveBeenCalled()
		})
	})
})