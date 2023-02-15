import { IsNumber, IsString } from "class-validator";

export class DeleteLessonDto {

    @IsString()
    courseId: string;

    @IsNumber()
    index: number;
}