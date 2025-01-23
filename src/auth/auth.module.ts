// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { EmailModule } from '../email/email.module';  // Import the EmailModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), EmailModule  // Add EmailModule to imports
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
