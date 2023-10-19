import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterDto } from './dto/water.dto';


@Controller('waters')
export class WaterController {
	constructor(private readonly waterService: WaterService) { }

	@Post()
	async create(@Body() waterDto: WaterDto) {
		return this.waterService.create(waterDto);
	};

	@Get()
	async findAll() {
		return this.waterService.findAll();
	};

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.waterService.findById(id);
	};
}