import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Session
} from '@nestjs/common';
import { Role } from '../user.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const user = await this.authService.validateUserByToken(request.session.token)
        if (!user) throw new UnauthorizedException()
        request.user = user
        const roles = user.role

        return roles.includes(Role.Admin)
    }
}