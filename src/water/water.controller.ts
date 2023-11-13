import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Query, ParseEnumPipe, Req } from '@nestjs/common'
import { WaterService } from './water.service'
import { WaterDto } from './dto/water.dto'
import { Request } from 'express'


@Controller('waters')
export class WaterController {
	constructor(private readonly waterService: WaterService) { }

	@Post()
	@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
	async create(@Body() waterDto: WaterDto) {
		return this.waterService.create(waterDto)
	};

	@Get()
	async findAll(@Req() req: Request) {
		return this.waterService.findAll(req)
	};

	@Get(':slug')
	async findById(@Param('slug') slug: string) {
		return this.waterService.findById(slug)
	};
}