import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization.replace('Bearer ', '')
            const payload: JWTPayload = await this.jwtService.verifyAsync(token, { secret: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjj" })
            const user = await this.userService.findById(payload._id)
            if (!user) throw new UnauthorizedException()
            request.user = user

            return true
        } catch (e) {
            throw new UnauthorizedException()
        }
    }
}