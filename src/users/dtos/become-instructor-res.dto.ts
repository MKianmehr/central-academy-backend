import { ApiProperty } from "@nestjs/swagger";

export class BecomeInstructorResDto {

    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;
}