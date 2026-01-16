import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { User } from './users/user.entity';
import { Movie } from './movies/movie.entity';
import { Review } from './movies/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'movie_db',
      entities: [User, Movie, Review],
      synchronize: true,
    }),
    UsersModule,
    MoviesModule,
  ],
})
export class AppModule {}
