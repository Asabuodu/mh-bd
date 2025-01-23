// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Configure the email transporter with your SMTP details
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // You can use Gmail or any other service like SendGrid, Mailgun
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password', // For Gmail, you may need an App Password
      },
    });
  }

  // Send reset password email
  async sendResetPasswordEmail(to: string, resetToken: string) {
    const resetLink = `http://yourfrontendurl.com/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: to,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetLink}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Password reset link sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send reset password email');
    }
  }
}
