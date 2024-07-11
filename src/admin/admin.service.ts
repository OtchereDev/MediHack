import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfessionalDTO } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createProfessional(body: CreateProfessionalDTO) {
    const exists = await this.prisma.professional.findFirst({
      where: { email: body.email },
    });

    if (exists) {
      return {
        status: 400,
        data: { message: 'Professional with this email already exists' },
      };
    }

    await this.prisma.professional.create({
      data: {
        ...body,
      },
    });

    return {
      status: 200,
      data: {
        message: 'successfully created professional',
      },
    };
  }
}
