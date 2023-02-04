import { ApiProperty } from "@nestjs/swagger";

export class EmailPasswordChangeResDto {

    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;
}