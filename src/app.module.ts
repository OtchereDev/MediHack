import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './constant/constant';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { HospitalModule } from './hospital/hospital.module';
import { EmergencyModule } from './emergency/emergency.module';

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

    AdminModule,

    HospitalModule,

    EmergencyModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
