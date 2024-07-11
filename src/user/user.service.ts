import { Injectable } from '@nestjs/common';
import { User, ForgotPassword } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import otp from 'src/utils/otp';
import bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { SignupDTO } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaClient: PrismaService,
    private mailService: MailService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.prismaClient.user.findFirst({ where: { email } });
  }

  async requestForgotPassword(email: string, name: string) {
    const code = otp(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      digits: true,
      specialChars: false,
    });

    await this.prismaClient.forgotPassword.create({
      data: {
        email,
        code,
      },
    });

    const message = `Hello ${name} \nUse this code to reset your account \nCode: ${code} \nBest regards, \nLaedral Express`;

    await this.mailService.sendMail(message, email, 'Reset password');
  }

  async findResetPassword(email: string, code: string) {
    const otp = await this.prismaClient.forgotPassword.findFirst({
      where: {
        email,
        code,
        isUsed: false,
      },
    });

    return otp;
  }

  async deactivateOtp(otp: ForgotPassword) {
    await this.prismaClient.forgotPassword.update({
      where: {
        id: otp.id,
      },
      data: {
        isUsed: true,
      },
    });
  }

  async updateUserPassword(id: number, password: string) {
    //   hash user password
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    await this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        password: hashPassword,
      },
    });
  }

  async createUser(body: SignupDTO) {
    const exist = await this.findOne(body.email);

    if (exist) {
      return {
        status: 400,
        data: {
          message: 'User with this email already exists',
        },
      };
    }

    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(body.password, saltRounds);

    await this.prismaClient.user.create({
      data: {
        ...body,
        password: hashPassword,
      },
    });

    return {
      status: 200,
      data: {
        message: 'User successfully created',
      },
    };
  }
}
