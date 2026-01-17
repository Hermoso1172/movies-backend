import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: 'Id of the review',
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the reviewer',
  })
  reviewer: string;

  @ApiProperty({
    example: 'Great movie with stunning visuals!',
    description: 'Comment of the review',
  })
  comment: string;

  @ApiProperty({
    example: 5,
    description: 'Rating of the movie from 1 to 5',
  })
  rating: number;

  @ApiProperty({
    example: 1,
    description: 'Id of the movie being reviewed',
  })
  movieId: number;
}
