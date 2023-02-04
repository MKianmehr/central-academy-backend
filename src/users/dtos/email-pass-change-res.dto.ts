import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class EmailPasswordChangeResDto {

    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;

    @ApiProperty()
    user: UserDto;
}