import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCourseDto {

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    name: string;

    @ApiProperty()
    @IsString()
    category: string;
}