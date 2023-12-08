
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './guards.service';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';



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

        guard['onModuleInit']();

        guard['authService'] = { guard: jest.fn().mockReturnValue(of({ valid: true, role: ['user'], userId: '123' })) };

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

    it('should throw UnauthorizedException if the token is not valid', async () => {
        const context = {
            switchToHttp: () => ({ getRequest: () => ({ headers: { authorization: 'Bearer invalidToken' } }) }),
            getHandler: () => ({}),
            getClass: () => ({}),
        } as ExecutionContext;

        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['user']);

        const result = { valid: false, role: [], userId: null };
        jest.spyOn(guard['authService'], 'guard').mockReturnValue(of(result));

        await expect(
            new Promise(async (resolve, reject) => {
                try {
                    await guard.canActivate(context);
                    resolve(false); 
                } catch (error) {
                    if (error instanceof UnauthorizedException) {
                        resolve(true); 
                    } else {
                        reject(error); 
                    }
                }
            })
        ).resolves.toBe(true);
    });


   
    it('should return true if no roles are specified for the route', async () => {
        const context = {
            switchToHttp: () => ({ getRequest: () => ({ headers: { authorization: 'Bearer token' } }) }),
            getHandler: () => ({}),
            getClass: () => ({}),
        } as any;
    
        const result = { valid: true, role: ['user'], userId: '123' };
        jest.spyOn(guard['authService'], 'guard').mockReturnValue(of(result));
    
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);
    
        const canActivateResult = await guard.canActivate(context);
        expect(canActivateResult).toBe(true);
    });
    
    it('should throw UnauthorizedException if the user roles do not match the required roles', async () => {
    const context = {
        switchToHttp: () => ({ getRequest: () => ({ headers: { authorization: 'Bearer token' } }) }),
        getHandler: () => ({}),
        getClass: () => ({}),
    } as any;

    const result = { valid: true, role: ['admin'], userId: '123' };
    jest.spyOn(guard['authService'], 'guard').mockReturnValue(of(result));

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['user']);

    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
});

});

