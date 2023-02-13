import { IsString } from "class-validator";

export class GetCourseQueryDto {

    @IsString()
    courseId: string;
}