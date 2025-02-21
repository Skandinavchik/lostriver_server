import { Module } from '@nestjs/common'
import { WatersResolver } from './waters.resolver'
import { WatersService } from './waters.service'

@Module({
  providers: [WatersResolver, WatersService],
})
export class WatersModule {}
