import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './movie.entity';
import { Review } from './review.entity';
import { ReviewController } from './review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MoviesController, ReviewController],
  providers: [MoviesService],
})
export class MoviesModule {}
