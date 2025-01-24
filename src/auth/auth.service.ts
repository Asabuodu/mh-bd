// // src/auth/auth.service.ts
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
// import { User, UserDocument } from '../users/schemas/user.schema';
// import { SignupDto } from './dto/signup.dto';
// import { SigninDto } from './dto/signin.dto';

// @Injectable()
// export class AuthService {
//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   // Signup method to register a new user
//   async signup(signupDto: SignupDto): Promise<any> {
//     const { username, email, password } = signupDto;

//     // Check if user already exists
//     const userExists = await this.userModel.findOne({ email }).exec();
//     if (userExists) {
//       throw new UnauthorizedException('User with this email already exists');
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create and save the new user
//     const newUser = new this.userModel({
//       // first_name,
//       // last_name,
//       username,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();

//     // Return the created user (excluding password)
//     return {
//       // first_name: newUser.first_name,
//       // last_name: newUser.last_name,
//       username: newUser.username, 
//       email: newUser.email,
//       id: newUser._id,
//     };
//   }

//   // Signin method to authenticate user and return JWT token
//   async signin(signinDto: SigninDto): Promise<{ token: string }> {
//     const { email, password } = signinDto;

//     // Find user by email
//     const user = await this.userModel.findOne({ email }).exec();
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     // Check if password matches
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     // Generate JWT token
//     const payload = { email: user.email, sub: user._id };
//     const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

//     return { token };
//   }
// }




// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../users/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ResetPasswordDto, ResetPasswordTokenDto } from './dto/reset-password.dto';
import { EmailService } from '../email/email.service'; // Import the email service

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  private emailService: EmailService, // Inject the email service
) {}

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
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Return the created user (excluding password)
    return {
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

  // Reset password request - send reset token via email (for simplicity, we simulate the process here)
  async resetPasswordRequest(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { email } = resetPasswordDto;

    // Find user by email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate a reset token (valid for 1 hour)
    const resetToken = jwt.sign({ email: user.email, sub: user._id }, 'resetSecretKey', { expiresIn: '1h' });

    // In a real-world scenario, you would send this token via email to the user.
    // Here we return it for testing purposes.
    return resetToken;
  }

  // Reset the password using the reset token
  async resetPasswordWithToken(resetPasswordTokenDto: ResetPasswordTokenDto): Promise<string> {
    const { token, password } = resetPasswordTokenDto;

    try {
      // Verify the reset token
      const decoded = jwt.verify(token, 'resetSecretKey') as { email: string; sub: string };

      // Find user by decoded email
      const user = await this.userModel.findOne({ email: decoded.email }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

    // Generate a reset token (valid for 1 hour)
    const resetToken = jwt.sign({ email: user.email, sub: user._id }, 'resetSecretKey', { expiresIn: '1h' });

    // Send the reset password email
    await this.emailService.sendResetPasswordEmail(user.email, resetToken);

    return 'Password reset link has been sent to your email.';


      // Hash the new password
      // const hashedPassword = await bcrypt.hash(password, 10);

      // // Update the user's password
      // user.password = hashedPassword;
      // await user.save();

      // return 'Password reset successful';
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }
}
