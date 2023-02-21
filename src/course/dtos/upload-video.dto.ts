import { IsString } from "class-validator";

export class UploadVideoDto {

    @IsString()
    courseId: string;

    @IsString()
    lessonId: string;
}