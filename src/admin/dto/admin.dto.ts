import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsLatitude,
  IsLatLong,
  IsLongitude,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
} from 'class-validator';
import { PASSWORD_REGEX } from 'src/constant/regex';

enum PROFESSIONALTYPES {
  'NURSE' = 'NURSE',
  'EMT' = 'EMT',
  'AMBULANCE' = 'AMBULANCE',
}

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

  @ApiProperty()
  @IsEnum(PROFESSIONALTYPES)
  type: ProfessionalType;
}

export class LocationUpdateDTO {
  @IsLatitude()
  @ApiProperty()
  latitude: string;

  @IsLongitude()
  @ApiProperty()
  longitude: string;
}
