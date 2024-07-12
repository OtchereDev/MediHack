import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EmergencyContactDTO } from './dto';

@Injectable()
export class EmergencyService {
  constructor(private prisma: PrismaService) {}

  async addEmergencyContact(body: EmergencyContactDTO, userId: number) {
    const contact = await this.prisma.emergencyContact.create({
      data: {
        ...body,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      status: 200,
      data: {
        message: 'Contact successfully created',
        response: {
          contact,
        },
      },
    };
  }

  async getMyEmergencyContact(userId: number) {
    const contacts = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: { EmergencyContact: true },
    });

    return {
      status: 200,
      data: {
        message: 'Contacts successfully fetched',
        response: {
          contacts: contacts.EmergencyContact,
        },
      },
    };
  }

  async deleteEmergencyContact(contactId: number, userId: number) {
    try {
      const contact = await this.prisma.emergencyContact.delete({
        where: {
          id: contactId,
          user: {
            id: userId,
          },
        },
      });

      return {
        status: 200,
        data: {
          message: 'Contact successfull deleted',
          response: {
            contact,
          },
        },
      };
    } catch (error) {
      return {
        status: 400,
        data: {
          message: 'Contact not deleted',
          response: {
            contact: null,
          },
        },
      };
    }
  }

  async updateEmergencyContact(
    contactId: number,
    userId: number,
    body: EmergencyContactDTO,
  ) {
    const contact = await this.prisma.emergencyContact.findFirst({
      where: {
        id: contactId,
        user: {
          id: userId,
        },
      },
    });

    if (!contact) throw new BadRequestException();

    const updatedContact = await this.prisma.emergencyContact.update({
      where: {
        id: contactId,
      },
      data: {
        ...body,
      },
    });

    return {
      status: 200,
      data: {
        message: 'successfully updated contact',
        contact: updatedContact,
      },
    };
  }

  async getEmergencyContact(contactId: number, userId: number) {
    try {
      const contact = await this.prisma.emergencyContact.findFirst({
        where: {
          id: contactId,
          user: {
            id: userId,
          },
        },
      });

      return {
        status: 200,
        data: {
          message: 'Contact successfull deleted',
          response: {
            contact,
          },
        },
      };
    } catch (error) {
      return {
        status: 400,
        data: {
          message: 'Contact not deleted',
          response: {
            contact: null,
          },
        },
      };
    }
  }
}
