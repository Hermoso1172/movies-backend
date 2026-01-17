import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Password of the user',
  })
  password: string;
}
