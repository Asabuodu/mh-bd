import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post()
  async requestPasswordReset(@Body() body: { email: string }): Promise<string> {
    await this.passwordResetService.requestPasswordReset(body.email);
    return 'Password reset email sent';
  }
}
