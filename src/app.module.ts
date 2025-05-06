import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReellyModule } from './reelly/reelly.module';

@Module({
  imports: [ReellyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
