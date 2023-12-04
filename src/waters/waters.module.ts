import { Module } from '@nestjs/common'
import { WatersService } from './waters.service'
import { WatersResolver } from './waters.resolver'


@Module({
	providers: [WatersResolver, WatersService],
})
export class WatersModule { }
