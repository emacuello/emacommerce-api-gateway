import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from '../interfaces/jwt.interface';
import { envs } from 'src/config/envs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const headers = context.switchToHttp().getRequest().headers;
    const token: string = headers['Authorization']
      ? JSON.parse(headers['Authorization'].split(' ')[1])
      : null;
    if (!token) {
      return false;
    }
    const payload: PayloadJwt = this.jwtService.verify(token, {
      secret: envs.JWT_SECRET,
    });
    if (!payload) {
      return false;
    }
    return requiredRoles.some((role) => payload.role?.includes(role));
  }
}
