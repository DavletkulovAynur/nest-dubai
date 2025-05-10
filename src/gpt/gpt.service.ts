import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GptService {
  private openai: OpenAI;

  private assistantId = 'asst_8e7I0LTTOec3Ca8WNAgSxXCH';

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(question: string): Promise<string> {
    // 1. Создаём новый thread (диалог)
    const thread = await this.openai.beta.threads.create();

    // 2. Добавляем сообщение от пользователя
    await this.openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: question,
    });

    // 3. Запускаем выполнение
    const run = await this.openai.beta.threads.runs.create(thread.id, {
      assistant_id: this.assistantId,
    });

    // 4. Ждём завершения выполнения
    let runStatus = await this.openai.beta.threads.runs.retrieve(
      thread.id,
      run.id,
    );
    while (runStatus.status !== 'completed') {
      if (['failed', 'cancelled', 'expired'].includes(runStatus.status)) {
        throw new Error(`Run failed with status: ${runStatus.status}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await this.openai.beta.threads.runs.retrieve(
        thread.id,
        run.id,
      );
    }

    // 5. Получаем последнее сообщение от ассистента
    const messages = await this.openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data.find((msg) => msg.role === 'assistant');

    return lastMessage?.content?.[0]?.type === 'text'
      ? lastMessage.content[0].text.value
      : 'Ответ не найден.';
  }
}
