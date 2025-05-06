import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReellyController } from './reelly.controller';

@Module({
  imports: [HttpModule],
  controllers: [ReellyController],
})
export class ReellyModule {}
