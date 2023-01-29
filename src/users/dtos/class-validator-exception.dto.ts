import { ApiProperty } from "@nestjs/swagger";

export class ClassValidatorExceptionDto {

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string[];

    @ApiProperty()
    error: string;
}