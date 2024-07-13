import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEnum, ValidateNested } from 'class-validator';

enum Role {
  'user' = 'user',
  'assistant' = 'assistant',
  'system' = 'system',
}

export class Chat {
  @IsEmpty()
  @ApiProperty()
  content: string;

  @IsEnum(Role)
  @ApiProperty()
  role: string;
}

export class ChatDTO {
  @ValidateNested({ each: true })
  @ApiProperty({ type: [Chat] })
  chats: Chat[];
}
