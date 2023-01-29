import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private authService: AuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const user = await this.authService.validateUserByToken(request.session.token)
            if (!user) throw new UnauthorizedException()
            request.user = user
            return true
        } catch (e) {
            throw new UnauthorizedException()
        }
    }
}