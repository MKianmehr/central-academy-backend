import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../course.schema";

export class CourseWithId extends Course {

    @ApiProperty()
    _id: string;

}