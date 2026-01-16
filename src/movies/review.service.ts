import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Movie } from './movie.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,

    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  async createReview(
    rating: number,
    comment: string,
    reviewer: string,
    movieId: number,
  ) {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
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
}
