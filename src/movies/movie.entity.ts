import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // New column for image URL
  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Review, (review) => review.movie, { cascade: true })
  reviews: Review[];

  averageRating?: number;
}
