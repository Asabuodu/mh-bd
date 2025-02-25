// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule], // Import ConfigModule to access ConfigService
  providers: [EmailService],
  exports: [EmailService],  // Export EmailService so it can be used by other modules
})
export class EmailModule {}
