// src/auth/dto/signup.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {

  @IsString()
  UserName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

