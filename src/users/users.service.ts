import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // Signup
  async signup(dto: SignupDto): Promise<User> {
    const { firstName, lastName, email, password } = dto;

    const existing = await this.usersRepo.findOneBy({ email });
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return this.usersRepo.save(user);
  }

  // Login
  async login(dto: LoginDto): Promise<User> {
    const { email, password } = dto;

    const user = await this.usersRepo.findOneBy({ email });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ConflictException('Invalid password');

    return user;
  }

  // Find by ID
  async findById(id: number): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
