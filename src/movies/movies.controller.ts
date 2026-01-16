// movies.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  @Get()
  async findAll() {
    return this.movieRepo.find();
  }

  @Post()
  async create(@Body() body: any) {
    const movie = this.movieRepo.create(body);
    return this.movieRepo.save(movie);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    const movie = await this.movieRepo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    Object.assign(movie, body);
    return this.movieRepo.save(movie);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const movie = await this.movieRepo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return this.movieRepo.remove(movie);
  }
}
