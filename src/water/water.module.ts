import { Module } from '@nestjs/common'
import { WaterService } from './water.service'
import { WaterResolver } from './water.resolver'


@Module({
	providers: [WaterResolver, WaterService],
})
export class WaterModule { }
