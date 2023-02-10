import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument, _Class } from './course.schema';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UserDocument } from 'src/users/user.schema';
import { CreateLessonDto } from './dtos/create-lesson.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name)
    private courseModel: Model<CourseDocument>) { }

    async findCourseById(courseId: string) {
        const course = await this.courseModel.findById(courseId)
        return course
    }

    async createCourse(createCourseDto: CreateCourseDto, user: UserDocument): Promise<CourseDocument> {
        const found = await this.courseModel.findOne({ name: createCourseDto.name })
        if (found) throw new ConflictException('name already in use.')
        const course = new this.courseModel({ name: createCourseDto.name, category: createCourseDto.category, instructor: user._id, slug: createCourseDto.name })
        await course.save()
        return course
    }

    async createLesson(createLessonDto: CreateLessonDto, user: UserDocument) {
        const course = await this.findCourseById(createLessonDto.courseId)
        if (!course) {
            throw new NotFoundException('')
        } else if (course.instructor.toString() !== user._id.toString()) {
            throw new ForbiddenException()
        }
        const found = course.lessons.some((lesson) => {
            return lesson.title === createLessonDto.title
        })
        if (found) throw new ConflictException('name already in use.')
        const index = createLessonDto.index
        delete createLessonDto.courseId
        delete createLessonDto.index

        course.lessons.splice(index, 0, { ...createLessonDto, slug: createLessonDto.title })
        await course.save()
        return course
    }
}
