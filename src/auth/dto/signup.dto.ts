// src/auth/dto/signup.dto.ts
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  UsernName: string;

  // @IsString()
  // @IsNotEmpty()
  // first_name: string;

  // @IsString()
  // @IsNotEmpty()
  // last_name: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// src/auth/dto/signin.dto.ts
// import { IsEmail, IsString } from 'class-validator';

// export class SigninDto {
//   @IsEmail()
//   email: string;

//   @IsString()
//   password: string;
// }
