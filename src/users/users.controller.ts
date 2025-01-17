// src/users/users.controller.ts

// import { Controller } from '@nestjs/common';

// @Controller('users')
// export class UsersController {
//   // Define methods for handling requests
//   getUsers() {
//     return "This will return a list of users.";
//   }
// }


// src/users/users.controller.ts

// import { Controller, Post, Body } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { SignupDto } from 'src/auth/dto/signup.dto';

// @Controller('users')  // The base path is '/users'
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post('signup')  // The signup path will be '/users/signup'
//   signup(@Body() signupDto: SignupDto) {
//     return this.usersService.signup(signupDto);  // Call the service to handle signup
//   }
// }




import { Controller, Post, Body } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { SignupDto } from '../auth/dto/signup.dto'; // Make sure you have this DTO defined

@Controller('users')  // The base route will be '/users'
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Signup route
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<User> {
    const { UsernName, email, password } = signupDto;
    try {
      return await this.usersService.signup(UsernName, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string; // Include the password in the User interface
// }
