import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument, _Class } from './course.schema';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UserDocument } from 'src/users/user.schema';
import { AddLessonDto } from './dtos/add-lesson.dto';
import { AddAssetDto } from './dtos/add-asset.dto';
import { UsersService } from 'src/users/users.service';
import { LessonWithId } from './dtos/lesson-with-id.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
        private userService: UsersService
    ) { }

    async findCourseById(courseId: string) {
        const course = await this.courseModel.findById(courseId)
        return course
    }

    async createCourse(createCourseDto: CreateCourseDto, user: UserDocument): Promise<CourseDocument> {
        const found = await this.courseModel.findOne({ name: createCourseDto.name })
        if (found) throw new ConflictException('name already in use.')
        const course = new this.courseModel({ name: createCourseDto.name, category: createCourseDto.category, instructor: user._id, slug: createCourseDto.name })
        await course.save()
        user.courses.push(course._id)
        await user.save()
        return course
    }

    async getCourses(user: UserDocument, skip: number, limit?: number) {
        return this.userService.getCourses(user._id, skip, limit)
    }

    async addLesson(addLessonDto: AddLessonDto, user: UserDocument) {
        const course = await this.findCourseById(addLessonDto.courseId)
        if (!course) {
            throw new NotFoundException('')
        } else if (course.instructor.toString() !== user._id.toString()) {
            throw new ForbiddenException()
        }
        const found = course.lessons.some((lesson) => {
            return lesson.title === addLessonDto.title
        })
        if (found) throw new ConflictException('name already in use.')
        const index = addLessonDto.index
        delete addLessonDto.courseId
        delete addLessonDto.index
        try {
            course.lessons.splice(index, 0, { ...addLessonDto, slug: addLessonDto.title })
            await course.save()
            return course
        } catch (e) {
            if (e.name === 'ValidationError') {
                throw new BadRequestException("Please fill out the form correctly to ensure accurate processing.")
            }
            throw new InternalServerErrorException('sth went wrong')
        }

    }

    async addAsset(addAssetDto: AddAssetDto, user: UserDocument) {
        const isFind = user.courses.some((course) => {
            return course._id.toString() === addAssetDto.courseId
        })
        if (!isFind) throw new ForbiddenException('')
        const course = await this.findCourseById(addAssetDto.courseId);
        const lesson = (course.lessons as LessonWithId[]).find((lesson) => {
            return lesson._id.toString() === addAssetDto.lessonId
        })
        const { _class, title, asset_type } = addAssetDto
        // lesson.asset = {_class, title, asset_type}
    }


}
