import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDTO, SignupDTO } from './dto/auth.dto';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const matches = bcrypt.compareSync(pass, user?.password);

    if (!matches) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result,
    };
  }

  async signInAsEpa(email: string, pass: string): Promise<any> {
    const user = await this.adminService.findProfessional(email);

    const matches = bcrypt.compareSync(pass, user?.password);

    if (!matches) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    const payload = { sub: user.id, email: user.email, type: 'epa' };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result,
    };
  }

  async requestForgotPassword(email: string) {
    const response = {
      message: 'Successfully sent an email to you',
    };

    const user = await this.usersService.findOne(email);

    if (!user) {
      return response;
    }

    await this.usersService.requestForgotPassword(user.email, user.name);

    return response;
  }

  async forgotPassword(body: ResetPasswordDTO) {
    const code = await this.usersService.findResetPassword(
      body.email,
      body.code,
    );

    if (!code) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne(body.email);

    if (!user) throw new UnauthorizedException();

    await this.usersService.updateUserPassword(user.id, body.password);

    await this.usersService.deactivateOtp(code);

    return {
      message: 'Successfully reset your password',
    };
  }

  async createUser(body: SignupDTO) {
    return await this.usersService.createUser(body);
  }
}
