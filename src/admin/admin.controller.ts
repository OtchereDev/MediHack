import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateProfessionalDTO, LocationUpdateDTO } from './dto/admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('create-professional')
  async createProfessional(@Body() body: CreateProfessionalDTO) {
    return await this.adminService.createProfessional(body);
  }

  @Post('update-location')
  async updateProfessionalLocation(@Body() body: LocationUpdateDTO) {
    return await this.adminService.updateProfessionalLocation(body);
  }
}
