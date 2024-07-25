import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CustomersService } from 'src/customers/customers.service';
import { UserJwtPayload } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.auth({ username, password });
    return user;
  }

  async validateCustomer(username: string, password: string) {
    const customer = await this.customersService.auth({ username, password });
    return customer;
  }

  async login(user: any) {
    const payload: UserJwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
