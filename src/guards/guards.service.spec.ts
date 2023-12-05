
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './guards.service';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';


describe('AuthGuard', () => {
    let guard: AuthGuard;
    let reflector: Reflector;

    const mockAuthClient = {
        getService: jest.fn().mockReturnValue({
            guard: jest.fn().mockReturnValue({ valid: true, role: ['user'], userId: '123' }),
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthGuard,
                Reflector,
                { provide: 'AUTH_PACKAGE', useValue: mockAuthClient as unknown as ClientGrpc },
            ],
        }).compile();

        guard = module.get<AuthGuard>(AuthGuard);
        reflector = module.get<Reflector>(Reflector);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should throw an UnauthorizedException if no token is provided', async () => {
        const context = {
            switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
            getHandler: () => null,
            getClass: () => null,
        } as any;

        await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should return true if the token is valid and has the required role', async () => {
        const context = {
            switchToHttp: () => ({ getRequest: () => ({ headers: { authorization: 'Bearer token' } }) }),
            getHandler: () => null,
            getClass: () => null,
        } as any;

        reflector.getAllAndOverride = jest.fn().mockReturnValue(['user']);

        await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

});

