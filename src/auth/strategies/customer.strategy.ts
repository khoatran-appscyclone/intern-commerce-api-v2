import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class CustomerStrategy extends PassportStrategy(Strategy, 'customer') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateCustomer(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
