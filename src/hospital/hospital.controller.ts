import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { MyLocationDTO } from './dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('hospital')
@ApiTags('Hospitals')
export class HospitalController {
  constructor(private service: HospitalService) {}

  @Post('nearest')
  async closestHospital(@Body() body: MyLocationDTO, @Res() res: Response) {
    const response = await this.service.closestHospital(
      body.longitude,
      body.latitude,
    );

    return res.status(response.status).json(response.data);
  }
}
