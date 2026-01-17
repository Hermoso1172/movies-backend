import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { ApiResponse } from '@nestjs/swagger';
import { GetMovieDto } from './dto/get-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  // --- Get all movies ---
  @ApiResponse({
    status: 200,
    type: [GetMovieDto],
    description: 'Get all movies',
  })
  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieRepo.find({ relations: ['reviews'] });
  }

  // --- Get one movie by ID ---
  @ApiResponse({
    status: 200,
    type: GetMovieDto,
    description: 'Get a movie by ID',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    const movie = await this.movieRepo.findOne({
      where: { id },
      relations: ['reviews'],
    });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  // --- Create a new movie ---
  @ApiResponse({
    status: 201,
    type: GetMovieDto,
    description: 'Create a new movie',
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
      limits: { fileSize: Infinity },
    }),
  )
  async create(
    @Body() body: { title: string; description?: string },
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Movie> {
    const movie = this.movieRepo.create({
      title: body.title,
      description: body.description,
      imageData: file ? file.buffer.toString('base64') : undefined,
    });
    return this.movieRepo.save(movie);
  }

  // --- Update an existing movie ---
  @ApiResponse({
    status: 200,
    type: GetMovieDto,
    description: 'Update a movie',
  })
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
      limits: { fileSize: Infinity },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title?: string; description?: string },
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Movie> {
    const movie = await this.movieRepo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');

    movie.title = body.title ?? movie.title;
    movie.description = body.description ?? movie.description;
    if (file) movie.imageData = file.buffer.toString('base64');

    return this.movieRepo.save(movie);
  }

  // --- Delete a movie ---
  @ApiResponse({
    status: 200,
    description: 'Delete a movie',
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    const movie = await this.movieRepo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return this.movieRepo.remove(movie);
  }
}
