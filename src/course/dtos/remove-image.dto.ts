import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RemoveImageDto {

    @ApiProperty()
    @IsString()
    courseId: string;
}