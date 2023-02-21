import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Asset, AssetType, _Class, _type } from './course.schema';
import { UserDocument } from 'src/users/user.schema';
import { AddAssetDto } from './dtos/add-asset.dto';
import { UsersService } from 'src/users/users.service';
import { LessonWithId } from './dtos/lesson-with-id.dto';
import { AWSService } from 'src/aws/aws.service';
import { CourseService } from './course.service';
import { UploadVideoDto } from './dtos/upload-video.dto';

@Injectable()
export class AssetService {
    constructor(
        private userService: UsersService,
        private awsService: AWSService,
        private courseService: CourseService,
    ) { }

    async findLessonById(courseId: string, lessonId: string) {
        const course = await this.courseService.findCourseById(courseId);
        if (!course) {
            throw new NotFoundException('')
        }
        return (course.lessons as LessonWithId[]).find((lesson) => {
            return lesson._id.toString() === lessonId
        })

    }

    async addAsset(addAssetDto: AddAssetDto, user: UserDocument) {
        const isFind = user.courses.some((course) => {
            return course._id.toString() === addAssetDto.courseId
        })
        if (!isFind) throw new ForbiddenException('')
        const course = await this.courseService.findCourseById(addAssetDto.courseId);
        const lesson = (course.lessons as LessonWithId[]).find((lesson) => {
            return lesson._id.toString() === addAssetDto.lessonId
        })
        const { _class, title, asset_type } = addAssetDto
        // lesson.asset = {_class, title, asset_type}
    }

    async uploadVideo(video: Express.Multer.File, uploadVideoDto: UploadVideoDto, user: UserDocument) {
        const { courseId, lessonId } = uploadVideoDto
        const isFind = user.courses.some((course) => {
            return course._id.toString() === uploadVideoDto.courseId
        })
        if (!isFind) throw new ForbiddenException('')

        const course = await this.courseService.findCourseById(courseId);
        if (!course) {
            throw new NotFoundException('')
        }
        const lesson = (course.lessons as LessonWithId[]).find((lesson) => {
            return lesson._id.toString() === lessonId
        })

        if (!lesson) {
            throw new NotFoundException('')
        }
        try {
            const res = await this.awsService.uploadVideo(video)
            const asset: Asset = { _class: _Class.Asset, asset_type: AssetType.Video, source_url: res }
            lesson.asset = asset
            await course.save()
            return lesson
        }
        catch (e) {
            throw new InternalServerErrorException('sth went wrong')
        }
    }

}
