import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './users.dto';
import { UserRole } from '@prisma/client';
import { hashPassword } from 'src/shared/utils/hashPassword';
import { LoginAuthDto } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { pick } from 'src/shared/utils/object';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const password = await hashPassword(createUserDto.password);
    return this.prisma.user.create({
      data: { ...createUserDto, role: UserRole.SuperAdmin, password },
    });
  }

  async auth(dto: LoginAuthDto) {
    const user = await this.prisma.user.findFirst({
      where: { username: dto.username },
    });
    if (!user) {
      throw new NotFoundException('Username or Password incorrect');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Username or Password incorrect');
    }

    return pick(user, ['id', 'username', 'fullname', 'role']);
  }

  getById(id: number) {
    return this.prisma.user.findFirstOrThrow({ where: { id } });
  }
}
