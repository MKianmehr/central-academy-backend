import { IsString } from "class-validator";
import { Types } from 'mongoose'

export class UploadImageDto {

    @IsString()
    image: string;

    @IsString()
    courseId: string;
}