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
import { UploadImageDto } from './dtos/upload-image.dto';
import { AWSService } from 'src/aws/aws.service';
import { EditLessonDto } from './dtos/edit-lesson.dto';
import { ReOrderLessonsDto } from './dtos/reOrder-lesson.dto';
import { DeleteLessonDto } from './dtos/delete-lesson.dto';
import { RemoveImageDto } from './dtos/remove-image.dto';
import { ImageDto } from 'src/aws/dtos/image.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
        private userService: UsersService,
        private awsService: AWSService
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
        const isFind = user.courses.some((course) => {
            return course._id.toString() === addLessonDto.courseId
        })
        if (!isFind) throw new ForbiddenException('')

        const course = await this.findCourseById(addLessonDto.courseId)
        if (!course) {
            throw new NotFoundException('')
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
            return course.lessons[index]
        } catch (e) {
            if (e.name === 'ValidationError') {
                throw new BadRequestException("Please fill out the form correctly to ensure accurate processing.")
            }
            throw new InternalServerErrorException('sth went wrong')
        }

    }

    async editLesson(editLessonDto: EditLessonDto, user: UserDocument) {
        const { courseId, lessonId, ...updatedFields } = editLessonDto
        const isFind = user.courses.some((course) => {
            return course._id.toString() === courseId
        })
        if (!isFind) throw new ForbiddenException('')

        const course = await this.findCourseById(courseId)
        course.lessons as LessonWithId[]
        if (!course) {
            throw new NotFoundException('')
        }
        const lesson = (course.lessons as LessonWithId[]).find((lesson) => {
            return lesson._id.toString() === lessonId
        })
        if (!lesson) {
            throw new NotFoundException('')
        }

        Object.keys(updatedFields).forEach((field) => {
            lesson[field] = updatedFields[field]
        })

        await course.save()
        return lesson

    }

    async deleteLesson(deleteLessonDto: DeleteLessonDto, user: UserDocument) {

        const { index, courseId } = deleteLessonDto

        const isFind = user.courses.some((course) => {
            return course._id.toString() === courseId
        })

        if (!isFind) throw new ForbiddenException('')

        const course = await this.findCourseById(courseId)
        if (!course) {
            throw new NotFoundException('')
        }
        course.lessons.splice(index, 1)
        await course.save()
        return { success: true, message: "lesson successfully deleted" }
    }

    async reOrderLessons(reOrderLessonsDto: ReOrderLessonsDto, user: UserDocument) {
        const isFind = user.courses.some((course) => {
            return course._id.toString() === reOrderLessonsDto.courseId
        })
        if (!isFind) throw new ForbiddenException('')
        const course = await this.findCourseById(reOrderLessonsDto.courseId);

        if (!course) {
            throw new NotFoundException('')
        }
        course.lessons = reOrderLessonsDto.lessons
        await course.save()
        return course
    }

    async uploadImage(uploadImageDto: UploadImageDto, user: UserDocument) {
        const isFind = user.courses.some((course) => {
            return course._id.toString() === uploadImageDto.courseId
        })
        if (!isFind) throw new ForbiddenException('')
        const course = await this.findCourseById(uploadImageDto.courseId.toString());
        if (Object.keys(course.image).length > 0) {
            const removeImageDto: RemoveImageDto = { courseId: course._id.toString() }
            const res = await this.removeImage(removeImageDto, user)
        }
        try {
            const res = await this.awsService.sendImage(uploadImageDto.image)
            course.image = res
            await course.save()
            return { success: true, message: "Image successfully added" }
        } catch (e) {
            return { success: false, message: "" }
        }
    }

    async removeImage(removeImageDto: RemoveImageDto, user: UserDocument) {
        const isFind = user.courses.some((course) => {
            return course._id.toString() === removeImageDto.courseId
        })
        if (!isFind) throw new ForbiddenException('')
        const course = await this.findCourseById(removeImageDto.courseId);
        if (!course) {
            throw new NotFoundException('')
        }

        try {
            const res = await this.awsService.removeImage(course.image as ImageDto)
            course.image = {}
            await course.save()
        } catch (e) {
            throw new InternalServerErrorException('sth went wrong')
        }

    }

    async getCourse(courseId: string, user: UserDocument) {
        const isFind = user.courses.some((course) => {
            return course._id.toString() === courseId
        })
        if (!isFind) throw new ForbiddenException('')
        const course = await this.findCourseById(courseId);
        return course
    }


}
