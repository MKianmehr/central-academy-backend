import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "../user.schema";

export const GetUser = createParamDecorator(
    (data: never, context: ExecutionContext): UserDocument => {
        const request = context.switchToHttp().getRequest()
        return request.user
    })