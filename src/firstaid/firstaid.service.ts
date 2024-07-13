import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { ChatDTO } from './dto';

@Injectable()
export class FirstaidService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async chat(chats: ChatDTO) {
    const result = await this.sender(
      chats.chats as ChatCompletionMessageParam[],
    );
    return {
      status: 200,
      data: {
        chats: result.choices,
      },
    };
  }

  async sender(messages: ChatCompletionMessageParam[]) {
    return await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [...messages],
    });
  }
}
