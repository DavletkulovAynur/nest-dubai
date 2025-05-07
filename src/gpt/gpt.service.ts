import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(question: string, context: string = ''): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: context || 'Ты ассистент, помогающий с анализом квартир.',
      },
      { role: 'user', content: question },
    ];

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4.1',
      messages,
    });

    return completion.choices[0].message.content || '';
  }
}
