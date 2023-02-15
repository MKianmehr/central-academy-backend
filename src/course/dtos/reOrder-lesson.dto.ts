import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";
import { LessonWithId } from './lesson-with-id.dto'

export class ReOrderLessonsDto {

    @IsString()
    courseId: string;

    @IsArray()
    lessons: LessonWithId[];
}