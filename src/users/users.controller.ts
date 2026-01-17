import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    type: GetUserDto,
    description: 'Sign up the user',
  })
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.usersService.signup(dto);
  }

  @ApiResponse({
    status: 200,
    type: GetUserDto,
    description: 'Login',
  })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }
}
