import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/constant/regex';

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ForgotPasswordDTO {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class ResetPasswordDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @Matches(PASSWORD_REGEX, {
    message: 'Provide a strong password',
  })
  @ApiProperty()
  password: string;
}

export class SignupDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Matches(PASSWORD_REGEX, { message: 'provide a strong password' })
  @ApiProperty()
  password: string;
}
