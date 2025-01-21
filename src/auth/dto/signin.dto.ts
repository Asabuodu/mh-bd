// src/auth/dto/signin.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;


   @IsString()
   @MinLength(5)
   username: string;

  @IsString()
  password: string;
}
