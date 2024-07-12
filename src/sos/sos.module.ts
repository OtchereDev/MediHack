import { Module } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SosService, PrismaService],
  controllers: [SosController],
})
export class SosModule {}
