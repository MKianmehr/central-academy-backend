import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClassValidatorExceptionDto } from 'src/users/dtos/class-validator-exception.dto';
import { CourseWithId } from './dtos/course-with-id.dto';
import { CourseService } from './course.service';
import { InstructorGuard } from 'src/instructor/guards/instructor.guard';
import { GetUser } from 'src/users/decorators/current-user.decorator';
import { UserDocument } from 'src/users/user.schema';
import { AddLessonDto } from './dtos/add-lesson.dto';
import { NestExceptionDto } from 'src/users/dtos/nest-exception.dto';
import { LessonWithId } from './dtos/lesson-with-id.dto';
import { AddAssetDto } from './dtos/add-asset.dto';
import { AssetWithId } from './dtos/asset-with-id.dto';
import { GetCoursesQueryDto } from './dtos/get-courses-query.dto';
import { UploadImageDto } from './dtos/upload-image.dto';
import { GetCourseQueryDto } from './dtos/get-course.query.dto';
import { UploadImageResDto } from './dtos/upload-image-res.dto';
import { EditLessonDto } from './dtos/edit-lesson.dto';
import { ReOrderLessonsDto } from './dtos/reOrder-lesson.dto';
import { DeleteLessonDto } from './dtos/delete-lesson.dto';

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
    addLesson(@Body() body: AddLessonDto, @GetUser() user: UserDocument) {
        return this.courseService.addLesson(body, user)
    }

    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiNotFoundResponse({ type: NestExceptionDto })
    @ApiForbiddenResponse({ type: NestExceptionDto })
    @ApiConflictResponse({ type: NestExceptionDto })
    @ApiCreatedResponse({ type: LessonWithId })
    @UseGuards(InstructorGuard)
    @Patch('/edit-lesson')
    editLesson(@Body() body: EditLessonDto, @GetUser() user: UserDocument) {
        return this.courseService.editLesson(body, user)
    }

    @ApiNotFoundResponse({ type: NestExceptionDto })
    @ApiForbiddenResponse({ type: NestExceptionDto })
    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @UseGuards(InstructorGuard)
    @Patch('/delete-lesson')
    deleteLesson(@Body() body: DeleteLessonDto, @GetUser() user: UserDocument) {
        return this.courseService.deleteLesson(body, user)
    }


    @ApiNotFoundResponse({ type: NestExceptionDto })
    @ApiForbiddenResponse({ type: NestExceptionDto })
    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiResponse({ type: CourseWithId })
    @UseGuards(InstructorGuard)
    @Patch('/reorder-lessons')
    reOrderLessons(@Body() body: ReOrderLessonsDto, @GetUser() user: UserDocument) {
        return this.courseService.reOrderLessons(body, user)
    }

    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiCreatedResponse({ type: AssetWithId })
    @ApiConflictResponse({ type: NestExceptionDto })
    @UseGuards(InstructorGuard)
    @Post('/add-asset')
    addAsset(@Body() body: AddAssetDto, @GetUser() user: UserDocument) {
        return this.courseService.addAsset(body, user)
    }

    @ApiOkResponse({ type: [CourseWithId] })
    @UseGuards(InstructorGuard)
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @Get('/get-courses')
    getCourses(@GetUser() user: UserDocument, @Query() query: GetCoursesQueryDto) {
        const { skip, limit } = query
        return this.courseService.getCourses(user, parseInt(skip), parseInt(limit))
    }

    @ApiCreatedResponse({ type: UploadImageResDto })
    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @UseGuards(InstructorGuard)
    @Post('/upload-image')
    async courseImage(@Body() uploadImageDto: UploadImageDto, @GetUser() user: UserDocument) {
        return this.courseService.uploadImage(uploadImageDto, user)
    }

    @ApiOkResponse({ type: CourseWithId })
    @ApiForbiddenResponse({ type: NestExceptionDto })
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @UseGuards(InstructorGuard)
    @Get('/get-course')
    async getCourse(@Query() query: GetCourseQueryDto, @GetUser() user: UserDocument) {
        return this.courseService.getCourse(query.courseId, user)
    }
}
