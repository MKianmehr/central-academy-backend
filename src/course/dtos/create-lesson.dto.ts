import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsOptional, MaxLength, IsNumber } from "class-validator";
import { _Class, _type } from "../course.schema";

export class CreateLessonDto {

    @ApiProperty()
    @IsString()
    _class: _Class;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    type: _type;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(320)
    description: string;

    @ApiProperty()
    @IsString()
    courseId: string;

    @ApiProperty()
    @IsNumber()
    index: number;

}