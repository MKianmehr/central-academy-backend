import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "./users.service";
import { JWTPayload } from "./interfaces/jwt-payload.interface";
import { UserDocument } from "./user.schema";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UsersService
    ) {
        super({
            secretOrKey: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JWTPayload): Promise<UserDocument> {
        const { _id } = payload;
        const user = await this.userService.findById(_id)

        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}