// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-example', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
