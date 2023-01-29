import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user.schema";

export class UserDto extends User {

    @ApiProperty()
    _id: string;

}