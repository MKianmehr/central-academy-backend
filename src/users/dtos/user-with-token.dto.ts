import { ApiProperty } from "@nestjs/swagger";
import { UserDocument } from "../user.schema";

export class UserWithTokenDto {

    @ApiProperty()
    user: UserDocument;

    @ApiProperty()
    accessToken: string;
}
