import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'mcfly@hillvalley.edu' })
  email: string;

  @ApiProperty({ example: '123456' })
  phoneNumber: string;
}
