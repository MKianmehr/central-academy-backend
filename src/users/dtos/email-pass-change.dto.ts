import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class EmailPasswordChangeDto {

    @IsString()
    @ApiProperty({ minimum: 6 })
    @MinLength(6)
    password: string;
}