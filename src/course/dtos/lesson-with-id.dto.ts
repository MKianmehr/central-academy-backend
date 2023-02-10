import { ApiProperty } from "@nestjs/swagger";
import { Lesson } from "../course.schema";

export class LessonWithId extends Lesson {

    @ApiProperty()
    _id: string;
}