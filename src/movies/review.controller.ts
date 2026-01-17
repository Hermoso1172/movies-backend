import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Movie } from './movie.entity';
import { ApiResponse } from '@nestjs/swagger';
import { GetReviewDto } from './dto/get-review.dto';

@Controller('review')
export class ReviewController {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,

    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  @ApiResponse({
    status: 201,
    type: GetReviewDto,
    description: 'Create a new review',
  })
  @Post()
  async createReview(@Body() body: any) {
    const { rating, comment, reviewer, movieID } = body;

    const movie = await this.movieRepo.findOne({
      where: { id: movieID },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const review = this.reviewRepo.create({
      rating,
      comment,
      reviewer,
      movie,
    });

    return this.reviewRepo.save(review);
  }

  @ApiResponse({
    status: 200,
    type: [GetReviewDto],
    description: 'Get reviews by movie ID',
  })
  @Get('movie/:id')
  async getReviewsByMovie(@Param('id') id: number) {
    return this.reviewRepo.find({
      where: { movie: { id } },
      relations: ['movie'],
      order: { id: 'DESC' },
    });
  }

  @ApiResponse({
    status: 200,
    type: GetReviewDto,
    description: 'Update a review',
  })
  @Put(':id')
  async updateReview(@Param('id') id: number, @Body() body: any) {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['movie'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    review.rating = body.rating ?? review.rating;
    review.comment = body.comment ?? review.comment;

    return this.reviewRepo.save(review);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete a review',
  })
  @Delete(':id')
  async deleteReview(@Param('id') id: number) {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewRepo.delete(id);
    return { message: 'Review deleted successfully' };
  }
}
