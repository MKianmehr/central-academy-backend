import { IsBoolean, IsString } from "class-validator";

export class UploadImageResDto {

    @IsString()
    message: string;

    @IsBoolean()
    success: boolean;
}