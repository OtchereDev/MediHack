import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmergencyService } from './emergency.service';
import { EmergencyContactDTO } from './dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request, Response } from 'express';

@Controller('emergency')
@ApiTags('Emergency Contact')
export class EmergencyController {
  constructor(private service: EmergencyService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  async addEmergencyContact(
    @Body() body: EmergencyContactDTO,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = req.user;

    const response = await this.service.addEmergencyContact(body, user.sub);

    return res.status(response.status).json(response.data);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getMyEmergencyContact(@Req() req: any, @Res() res: Response) {
    const user = req.user;

    const response = await this.service.getMyEmergencyContact(user.sub);

    return res.status(response.status).json(response.data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteEmergencyContact(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = req.user;

    const response = await this.service.deleteEmergencyContact(id, user.sub);

    return res.status(response.status).json(response.data);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateEmergencyContact(
    @Body() body: EmergencyContactDTO,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = req.user;

    const response = await this.service.updateEmergencyContact(
      id,
      user.sub,
      body,
    );

    return res.status(response.status).json(response.data);
  }

  @UseGuards(AuthGuard)
  @Get('id')
  async getEmergencyContact(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = req.user;

    const response = await this.service.getEmergencyContact(id, user.sub);

    return res.status(response.status).json(response.data);
  }
}
