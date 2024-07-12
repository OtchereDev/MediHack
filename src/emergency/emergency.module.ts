import { Module } from '@nestjs/common';
import { EmergencyController } from './emergency.controller';
import { EmergencyService } from './emergency.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmergencyController],
  providers: [EmergencyService, PrismaService],
})
export class EmergencyModule {}
