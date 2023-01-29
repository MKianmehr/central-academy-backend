import { UserDocument } from "../user.schema";

export class UserWithTokenInterface {

    user: UserDocument;

    accessToken: string;
}
