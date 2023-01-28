import { ApiProperty } from "@nestjs/swagger";

export class ClassValidatorException {

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string[];

    @ApiProperty()
    error: string;
}