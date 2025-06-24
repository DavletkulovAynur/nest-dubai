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

  async ask(question: string): Promise<{
    title: string;
    results: Array<{
      id: number;
      name: string;
      developer: string;
      area: string;
      coordinates: string;
      image: string;
      status: string;
      sale_status: string;
      price_currency: string;
      post_handover: boolean;
    }>;
  }> {
    const prompt = `
      Ты — интеллектуальный помощник по поиску жилья.

      🔸 Всегда возвращай ответ строго в формате JSON:
      {
        "title": "Краткий вывод или рекомендация",
        "results": [
          {
            "id": 123,
            "name": "Название объекта",
            "developer": "Девелопер",
            "area": "Район",
            "coordinates": "25.062542, 55.208950",
            "image": "https://...",
            "status": "Presale / Ready / Off Plan и т.д.",
            "sale_status": "Статус продажи",
            "price_currency": "AED или USD",
            "post_handover": true/false
          }
        ]
      }

      🔸 Если пользователь не указал ключевые параметры (город, бюджет и т.д.), попроси их уточнить и верни:
      {
        "title": "Пожалуйста, укажите город, бюджет или другие параметры для поиска жилья.",
        "results": []
      }

      🔸 Если ничего не найдено по параметрам, верни:
      {
        "title": "К сожалению, по заданным параметрам ничего не найдено. Попробуйте изменить фильтры или указать другой район.",
        "results": []
      }

      🔸 Если есть результаты — заполни массив "results" с 3–5 лучшими вариантами. Каждый результат должен быть подробным и реалистичным.

      Пользователь спрашивает: ${question}
    `;

    const thread = await this.openai.beta.threads.create();

    await this.openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: prompt,
    });

    const run = await this.openai.beta.threads.runs.create(thread.id, {
      assistant_id: this.assistantId,
    });

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

    const messages = await this.openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data.find((msg) => msg.role === 'assistant');

    const textResponse =
      lastMessage?.content?.[0]?.type === 'text'
        ? lastMessage.content[0].text.value
        : null;

    if (!textResponse) {
      return {
        title: 'Ответ не найден.',
        results: [],
      };
    }

    try {
      const parsed = JSON.parse(textResponse);
      return parsed;
    } catch (err) {
      console.error('Ошибка при парсинге ответа:', err);
      return {
        title: 'Ошибка при обработке ответа ассистента.',
        results: [],
      };
    }
  }
}
