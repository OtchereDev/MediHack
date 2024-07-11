import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './constant/constant';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { HealthprofessionalModule } from './healthprofessional/healthprofessional.module';
import { HeathprofessionalController } from './heathprofessional/heathprofessional.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),

    MailModule,

    HealthprofessionalModule,

    AdminModule,
  ],
  controllers: [HeathprofessionalController],
  providers: [PrismaService],
})
export class AppModule {}
