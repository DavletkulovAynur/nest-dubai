import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReellyModule } from './reelly/reelly.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [ReellyModule, GptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
