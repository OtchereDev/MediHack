import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class CreateSOS {
  @IsLongitude()
  @ApiProperty()
  longitude: string;

  @IsLatitude()
  @ApiProperty()
  latitude: string;

  @ApiProperty()
  message: string;
}
