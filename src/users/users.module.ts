import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule { }