import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClassValidatorExceptionDto } from 'src/users/dtos/class-validator-exception.dto';
import { CourseWithId } from './dtos/course-with-id.dto';
import { CourseService } from './course.service';
import { InstructorGuard } from 'src/instructor/guards/instructor.guard';
import { GetUser } from 'src/users/decorators/current-user.decorator';
import { UserDocument } from 'src/users/user.schema';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { NestExceptionDto } from 'src/users/dtos/nest-exception.dto';
import { LessonWithId } from './dtos/lesson-with-id.dto';

@Controller('course')
export class CourseController {
    constructor(
        private courseService: CourseService
    ) { }

    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @UseGuards(InstructorGuard)
    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiConflictResponse({ type: NestExceptionDto })
    @ApiCreatedResponse({ type: CourseWithId })
    @Post('/create')
    createCourse(@Body() body: CreateCourseDto, @GetUser() user: UserDocument) {
        return this.courseService.createCourse(body, user)
    }

    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiNotFoundResponse({ type: NestExceptionDto })
    @ApiForbiddenResponse({ type: NestExceptionDto })
    @ApiConflictResponse({ type: NestExceptionDto })
    @ApiCreatedResponse({ type: LessonWithId })
    @UseGuards(InstructorGuard)
    @Post('/add-lesson')
    createLesson(@Body() body: CreateLessonDto, @GetUser() user: UserDocument) {
        return this.courseService.createLesson(body, user)
    }
}
