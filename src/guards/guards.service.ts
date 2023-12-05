

import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    OnModuleInit,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { AuthService } from 'src/interface/auth.interface';
import { Reflector } from '@nestjs/core';
import { ExceptionMessage, Role } from '../interface/enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {

    private authService: AuthService;

    constructor(
        @Inject('AUTH_PACKAGE') private AuthClient: ClientGrpc,
        private reflector: Reflector,
    ) { }

    onModuleInit() {
        this.authService = this.AuthClient.getService<AuthService>('AuthService');
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const result = await lastValueFrom(this.authService.guard({ token }));

            if (result.valid) {

                const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
                    context.getHandler(),
                    context.getClass(),
                ]);

                if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.some(role => result.role.includes(role))) {
                    throw new UnauthorizedException(ExceptionMessage.WRONG_ROLE);
                }

                request['user'] = { sub: result.userId, role: result.role };
                return true;
            } else {
                throw new UnauthorizedException();
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}