import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class EmergencyContactDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsPhoneNumber()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;
}
