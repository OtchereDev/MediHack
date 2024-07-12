import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfessionalDTO, LocationUpdateDTO } from './dto/admin.dto';

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

  async updateProfessionalLocation(body: LocationUpdateDTO) {
    const exists = await this.prisma.professional.findFirst({
      where: { id: body.id },
    });

    if (!exists) throw new UnauthorizedException();

    await this.prisma.$executeRaw`
      UPDATE "Professional"
      SET "location" = ST_SetSRID(ST_MakePoint(${body.latitude}, ${body.longitude}), 4326)
      WHERE "id" = ${body.id};
    `;

    return {
      status: 200,
      data: {
        message: 'successfully updated location',
      },
    };
  }
}
