import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './course.schema';
import { UsersModule } from 'src/users/users.module';
import { AWSService } from 'src/aws/aws.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema
      }
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, AWSService]
})
export class CourseModule { }
