import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
})
export class AppModule { }
