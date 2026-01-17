import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    example: 'Clarence',
  })
  firstName: string;

  @ApiProperty({
    example: 'Hermoso',
  })
  lastName: string;

  @ApiProperty({
    example: 'clarencehermoso@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'securePassword123',
  })
  password: string;
}
