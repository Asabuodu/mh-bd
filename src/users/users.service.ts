// /* eslint-disable prettier/prettier */
// import { Injectable, NotFoundException } from '@nestjs/common';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// // eslint-disable-next-line prettier/prettier
// }

// @Injectable()
// export class UsersService {
//   private users: User[] = [];

//   // Create a new user
//   create(name: string, email: string): User {
//     const user: User = {
//       id: this.users.length + 1,
//       name,
//       email,
//     };
//     this.users.push(user);
//     return user;
//   }

//   // Find all users
//   findAll(): User[] {
//     return this.users;
//   }

//   // Find a user by ID
//   findOne(id: number): User {
//     const user = this.users.find((user) => user.id === id);
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   // Update user details
//   update(id: number, name: string, email: string): User {
//     const user = this.findOne(id);
//     user.name = name;
//     user.email = email;
//     return user;
//   }

//   // Delete a user by ID
//   remove(id: number): void {
//     const userIndex = this.users.findIndex((user) => user.id === id);
//     if (userIndex === -1) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     this.users.splice(userIndex, 1);
//   }
// }




import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // Add bcrypt for password hashing

export interface  User {
  id: number;
  username: string;
  email: string;
  password: string; // Include the password in the User interface
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  // Create a new user (signup)
  async signup(name: string, email: string, password: string): Promise<User> {
    // Check if the user already exists (basic email validation)
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: this.users.length + 1,
      username: name,
      email,
      password: hashedPassword, // Save the hashed password
    };

    this.users.push(newUser); // Add the user to the array (in a real app, save to the database)
    return newUser;
  }

  // Other methods like findAll, findOne, update, remove remain unchanged
  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: number, username: string, email: string): User {
    const user = this.findOne(id);
    user.username = username;
    user.email = email;
    return user;
  }

  remove(id: number): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
