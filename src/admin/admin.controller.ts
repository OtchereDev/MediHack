import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateProfessionalDTO, LocationUpdateDTO } from './dto/admin.dto';
import { EPAGuard } from 'src/auth/guard/epa.guard';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('create-professional')
  async createProfessional(@Body() body: CreateProfessionalDTO) {
    return await this.adminService.createProfessional(body);
  }

  @Post('update-location')
  @UseGuards(EPAGuard)
  async updateProfessionalLocation(
    @Body() body: LocationUpdateDTO,
    @Req() req: any,
  ) {
    const user = req.user;
    return await this.adminService.updateProfessionalLocation(body, user.id);
  }
}
