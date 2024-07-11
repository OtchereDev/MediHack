import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/constant/regex';

export class CreateProfessionalDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsPhoneNumber()
  @ApiProperty()
  phone: string;

  @Matches(PASSWORD_REGEX, { message: 'provide a strong password' })
  @ApiProperty()
  password: string;
}
