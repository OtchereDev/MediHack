import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfessionalDTO, LocationUpdateDTO } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';

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

    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(body.password, saltRounds);

    await this.prisma.professional.create({
      data: {
        ...body,
        password: hashPassword,
      },
    });

    return {
      status: 200,
      data: {
        message: 'successfully created professional',
      },
    };
  }

  async updateProfessionalLocation(body: LocationUpdateDTO, id: number) {
    const exists = await this.prisma.professional.findFirst({
      where: { id },
    });

    if (!exists) throw new UnauthorizedException();

    await this.prisma.$executeRaw`
      UPDATE "Professional"
      SET "location" = ST_SetSRID(ST_MakePoint(${body.latitude}, ${body.longitude}), 4326)
      WHERE "id" = ${id};
    `;

    return {
      status: 200,
      data: {
        message: 'successfully updated location',
      },
    };
  }

  async findProfessional(email: string) {
    return this.prisma.professional.findFirst({
      where: {
        email,
      },
    });
  }
}
