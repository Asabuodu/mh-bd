// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../users/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Signup method to register a new user
  async signup(signupDto: SignupDto): Promise<any> {
    const { username, email, password } = signupDto;

    // Check if user already exists
    const userExists = await this.userModel.findOne({ email }).exec();
    if (userExists) {
      throw new UnauthorizedException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new this.userModel({
      // first_name,
      // last_name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Return the created user (excluding password)
    return {
      // first_name: newUser.first_name,
      // last_name: newUser.last_name,
      username: newUser.username, 
      email: newUser.email,
      id: newUser._id,
    };
  }

  // Signin method to authenticate user and return JWT token
  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const { email, password } = signinDto;

    // Find user by email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user._id };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    return { token };
  }
}
