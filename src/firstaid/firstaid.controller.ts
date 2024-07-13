import { Body, Controller, Post, Res } from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { ChatDTO } from './dto';
import { Response } from 'express';

@Controller('firstaid')
export class FirstaidController {
  constructor(private service: FirstaidService) {}

  @Post('chats')
  async chats(@Body() body: ChatDTO, @Res() res: Response) {
    const response = await this.service.chat(body);

    return res.status(response.status).json(response.data);
  }
}
