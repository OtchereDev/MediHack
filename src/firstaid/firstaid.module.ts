import { Module } from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { FirstaidController } from './firstaid.controller';

@Module({
  providers: [FirstaidService],
  controllers: [FirstaidController]
})
export class FirstaidModule {}
