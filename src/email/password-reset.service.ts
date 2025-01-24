import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';  // import the MailService

@Injectable()
export class PasswordResetService {
  constructor(private emailService: EmailService) {}

  async requestPasswordReset(email: string): Promise<void> {
    const token = this.generateResetToken();
    console.log('Generated token:', token); // You should store this token in your DB with an expiry date

    await this.emailService.sendPasswordResetEmail(email, token);
  }

  private generateResetToken(): string {
    // This should be a more secure method to generate a token
    return Math.random().toString(36).substring(2, 15); 
  }
}
