// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Signup route
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    return this.authService.signup(signupDto);
  }

  // Signin route
  @Post('signin')
  async signin(@Body() signinDto: SigninDto): Promise<{ token: string }> {
    return this.authService.signin(signinDto);
  }
}
