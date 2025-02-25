import { Module } from '@nestjs/common';
// import { MailService } from '/mail.service';
import { EmailService } from './email.service';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PasswordResetController],
  providers: [EmailService, PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
