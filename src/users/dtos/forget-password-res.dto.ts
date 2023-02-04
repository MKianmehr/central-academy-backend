import { ApiProperty } from "@nestjs/swagger";

export class ForgetPasswordResDto {

    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;
}