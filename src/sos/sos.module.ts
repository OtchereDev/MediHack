import { Module } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';

@Module({
  providers: [SosService],
  controllers: [SosController]
})
export class SosModule {}
