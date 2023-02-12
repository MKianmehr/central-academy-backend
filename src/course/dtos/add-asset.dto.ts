import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsIn } from "class-validator";
import { AssetType, _Class, _type } from "../course.schema";

export class AddAssetDto {

    @ApiProperty()
    @IsIn(Object.values(_Class))
    _class: _Class;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    title: string;

    @IsIn(Object.values(AssetType))
    @ApiProperty()
    asset_type: AssetType;

    @IsString()
    @ApiProperty()
    courseId: string;

    @IsString()
    @ApiProperty()
    lessonId: string;

}