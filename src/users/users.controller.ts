
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { SignupDto } from '../auth/dto/signup.dto'; // Make sure you have this DTO defined

@Controller('users')  // The base route will be '/users'
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Signup route
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<User> {
    const { username, email, password } = signupDto;
    try {
      return await this.usersService.signup(username, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
