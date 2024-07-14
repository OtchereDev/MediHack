import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SosService } from './sos.service';
import { CreateSOS } from './dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { EPAGuard } from 'src/auth/guard/epa.guard';

@Controller('sos')
export class SosController {
  constructor(private service: SosService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async requestSOS(
    @Body() body: CreateSOS,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = req.user;

    const response = await this.service.requestSOS(body, user.sub);

    return res.status(response.status).json(response.data);
  }

  @Post('accept/:id')
  @UseGuards(EPAGuard)
  async acceptSOS(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = req.user;

    const response = await this.service.acceptSOS(user.sub, id);

    return res.status(response.status).json(response.status);
  }
}
