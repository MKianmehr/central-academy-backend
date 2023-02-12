import { ApiProperty } from "@nestjs/swagger";
import { Lesson } from "../course.schema";
import { Types } from "mongoose";

export class LessonWithId extends Lesson {

    @ApiProperty()
    _id: Types.ObjectId;
}