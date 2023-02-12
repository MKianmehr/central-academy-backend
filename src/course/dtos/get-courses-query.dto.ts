import { IsOptional, IsString } from "class-validator";

export class GetCoursesQueryDto {

    @IsString()
    skip: string;

    @IsOptional()
    @IsString()
    limit?: string;
}