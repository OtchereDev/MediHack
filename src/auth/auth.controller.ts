import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: LoginDTO) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('request-forgot-password')
  async requestForgotPassword(@Body() body: ForgotPasswordDTO) {
    return await this.authService.requestForgotPassword(body.email);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ResetPasswordDTO) {
    return await this.authService.forgotPassword(body);
  }
}
