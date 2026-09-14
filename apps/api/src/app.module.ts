import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { TherapistsModule } from './therapists/therapists.module'

@Module({
  imports: [PrismaModule, TherapistsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
