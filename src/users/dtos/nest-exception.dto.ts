import { ApiProperty } from "@nestjs/swagger";

export class NestExceptionDto {

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string

}