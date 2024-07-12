import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class MyLocationDTO {
  @IsLongitude()
  @ApiProperty()
  longitude: string;

  @IsLatitude()
  @ApiProperty()
  latitude: string;
}
