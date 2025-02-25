// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PasswordResetModule } from './email/password-reset.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';


@Module({
  imports: [
    PasswordResetModule,  // Import PasswordResetModule here

    ConfigModule.forRoot(), // Loads .env variables

    //  MongooseModule.forRoot('mongodb://localhost/nestjs-example'
    MongooseModule.forRoot('mongodb://localhost:27017', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
    EmailModule,

  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class AppModule {}
