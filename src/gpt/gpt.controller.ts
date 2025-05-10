import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('ask')
  async askGpt(@Body() body: { question: string; context?: string }) {
    const { question, context } = body;
    const answer = await this.gptService.ask(question);
    return { answer };
  }
}
