import { Module } from '@nestjs/common'
import { EnvConfigModule } from './configs/env-config.module'
import { GraphqlConfigModule } from './configs/graphql.config.module'
import { PrismaModule } from './prisma/prisma.module'
import { WatersModule } from './waters/waters.module'

@Module({
  imports: [
    EnvConfigModule,
    GraphqlConfigModule,
    PrismaModule,
    WatersModule,
  ],
})
export class AppModule {}
