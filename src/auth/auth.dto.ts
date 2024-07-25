import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsString } from 'class-validator';
import { Request as HttpRequest } from 'express';

export class LoginAuthDto {
  @ApiProperty({ example: 'customer001' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  password: string;
}

export type AuthRole = UserRole | 'Customer';

export class UserJwtPayload {
  userId: number;
  username: string;
  sub: string;
  role: AuthRole;
}

export type AuthRequest = HttpRequest & { user: UserJwtPayload };
