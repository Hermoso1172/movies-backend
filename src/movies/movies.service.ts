import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Review } from './review.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepo: Repository<Movie>,
    @InjectRepository(Review)
    private readonly reviewsRepo: Repository<Review>,
  ) {}

  // Create a new movie
  async createMovie(title: string, description: string, imageUrl?: string): Promise<Movie> {
    const movie = this.moviesRepo.create({ title, description, imageUrl });
    return this.moviesRepo.save(movie);
  }

  // Get all movies with reviews and average rating
  async getMovies(): Promise<Movie[]> {
    const movies = await this.moviesRepo.find({ relations: ['reviews'] });
    return movies.map((movie) => {
      const totalRating = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
      movie.averageRating = movie.reviews.length ? totalRating / movie.reviews.length : 0;
      return movie;
    });
  }

  // Get a single movie by ID
  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.moviesRepo.findOne({ where: { id }, relations: ['reviews'] });
    if (!movie) throw new NotFoundException('Movie not found');
    const totalRating = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
    movie.averageRating = movie.reviews.length ? totalRating / movie.reviews.length : 0;
    return movie;
  }

  // Update movie
  async updateMovie(id: number, body: { title?: string; description?: string; imageUrl?: string }): Promise<Movie> {
    const movie = await this.moviesRepo.findOneBy({ id });
    if (!movie) throw new NotFoundException('Movie not found');

    movie.title = body.title ?? movie.title;
    movie.description = body.description ?? movie.description;
    movie.imageUrl = body.imageUrl ?? movie.imageUrl;

    return this.moviesRepo.save(movie);
  }

  // Delete movie
  async deleteMovie(id: number): Promise<{ message: string }> {
    const result = await this.moviesRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Movie not found');
    return { message: 'Movie deleted successfully' };
  }

  // Add review to a movie
  async addReview(movieId: number, reviewer: string, comment: string, rating: number): Promise<Review> {
    const movie = await this.moviesRepo.findOneBy({ id: movieId });
    if (!movie) throw new NotFoundException('Movie not found');

    const review = this.reviewsRepo.create({ reviewer, comment, rating, movie });
    return this.reviewsRepo.save(review);
  }
}
