import { ApiProperty } from '@nestjs/swagger';

export class GetMovieDto {
  @ApiProperty({
    example: 1,
    description: 'Id of the movie',
  })
  id: number;

  @ApiProperty({
    example: 'Inception',
    description: 'Title of the movie',
  })
  title: string;

  @ApiProperty({
    example: 'A mind-bending thriller about dream invasion.',
    description: 'Description of the movie',
  })
  description: string;

  @ApiProperty({
    example: 'http://example.com/image.jpg',
    description: 'Image URL of the movie',
    required: false,
  })
  imageUrl?: string;
}
