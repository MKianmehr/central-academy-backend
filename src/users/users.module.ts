import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]),
  JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: {
      expiresIn: 86400,
    }
  })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, AdminGuard],
  exports: []
})
export class UsersModule { }
