<<<<<<< HEAD
export class UpdateMovieDto {
  title?: string;
  description?: string;
  imagePath?: string;
}
=======
import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
>>>>>>> ebd26bba5f50c50d683d72174e9e514fcddd25b2
