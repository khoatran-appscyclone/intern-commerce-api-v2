import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJwtPayload } from '../../auth/auth.dto';

export const UserFromToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserJwtPayload;
  },
);
