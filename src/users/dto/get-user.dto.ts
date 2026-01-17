import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    example: 1,
    description: 'Id of the user',
  })
  id: number;

  @ApiProperty({
    example: 'Clarence',
    description: 'Name of the user',
  })
  firstName: string;

  @ApiProperty({
    example: 'Hermoso',
    description: 'Last name of the user',
  })
  lastName: string;

  @ApiProperty({
    example: 'email@email.com',
    description: 'Email of the user',
  })
  email: string;
}
