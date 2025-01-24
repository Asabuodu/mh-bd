import { Module } from '@nestjs/common';
// import { MailService } from '/mail.service';
import { EmailService } from './email.service';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';

@Module({
  imports: [],
  controllers: [PasswordResetController],
  providers: [EmailService, PasswordResetService],
})
export class PasswordResetModule {}
