// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ResetPasswordDto, ResetPasswordTokenDto } from './dto/reset-password.dto';

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


  // Endpoint to request a password reset (sending a reset token)
  @Post('reset-password')
  
  async resetPasswordRequest(@Body() resetPasswordDto: ResetPasswordDto) {
    const resetToken = await this.authService.resetPasswordRequest(resetPasswordDto);
    return { resetToken }; // In practice, this would be sent via email
  }

  // Endpoint to reset the password using the reset token
  @Post('reset-password-token')
  async resetPasswordWithToken(@Body() resetPasswordTokenDto: ResetPasswordTokenDto) {
    const message = await this.authService.resetPasswordWithToken(resetPasswordTokenDto);
    return { message };
  }
}
