import { Injectable } from '@nestjs/common';
import { CreateSOS } from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SosService {
  constructor(private prisma: PrismaService) {}

  async requestSOS(body: CreateSOS, userId: number) {
    const sosRecord = await this.prisma.$queryRaw`
    INSERT INTO "SOS" ("location", "userId", "message", "status", "createdAt", "updatedAt")
    VALUES (ST_SetSRID(ST_MakePoint(${body.longitude}, ${body.latitude}), 4326), ${userId}, ${body.message}, 'INITIATED', NOW(), NOW())
    RETURNING *;
  `;

    return {
      status: 200,
      data: {
        message: 'Successfully created sos',
        response: {
          sos: sosRecord,
        },
      },
    };
  }

  async acceptSOS(userId: number, sosId: number) {
    const sos = await this.prisma.sOS.update({
      where: {
        id: sosId,
      },
      data: {
        professional: {
          connect: {
            id: userId,
          },
        },
        status: 'ACCEPTED',
      },
    });

    return {
      status: 200,
      data: {
        message: 'Successfully accepted sos',
        response: {
          sos,
        },
      },
    };
  }

  async resolveSOS() {}
}
