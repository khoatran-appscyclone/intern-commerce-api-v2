import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthRole } from '../../auth/auth.dto';

export const HasRoles = (...roles: AuthRole[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AuthRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const validRole = requiredRoles.some((role) => user?.role?.includes(role));
    if (!validRole) {
      throw new UnauthorizedException(`${user.role} do not support this API`);
    }
    return true;
  }
}

export interface AuthGuardArgs {
  summary?: string;
}

export function AuthGuardCustomer() {
  return applyDecorators(
    HasRoles('Customer'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
  );
}

export function AuthGuardAdmin() {
  return applyDecorators(
    HasRoles('Staff', 'SuperAdmin'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
  );
}

export function AuthGuardAllRoles(args?: AuthGuardArgs) {
  return applyDecorators(
    HasRoles('Customer', 'Staff', 'SuperAdmin'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    ApiOperation({
      summary: args?.summary,
      description: 'This API requires jwt token and support: Customer, Admin',
    }),
  );
}
