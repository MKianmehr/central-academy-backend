import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({ minimum: 6 })
    @MinLength(6)
    @IsString()
    password: string;

}