import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true }) // store image as Base64
  imageData?: string;

  @Column({ type: 'text', nullable: true }) // <-- add this line
  description?: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews?: Review[];

  averageRating?: number;
}
