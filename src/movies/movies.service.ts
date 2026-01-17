import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepo: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepo.find({ relations: ['reviews'] });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepo.findOne({ where: { id }, relations: ['reviews'] });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async create(createDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepo.create(createDto);
    return this.moviesRepo.save(movie);
  }

  async update(id: number, updateDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);

    Object.assign(movie, updateDto);

    // recalculate average rating if reviews exist
    if (movie.reviews?.length) {
      const total = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
      movie.averageRating = total / movie.reviews.length;
    }

    return this.moviesRepo.save(movie);
  }

  async remove(id: number): Promise<Movie> {
    const movie = await this.findOne(id);
    return this.moviesRepo.remove(movie);
  }
}
