import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh.strategy';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from 'src/customers/customers.module';
import { CustomerStrategy } from './strategies/customer.strategy';
import { UserStrategy } from './strategies/user.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CustomersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    CustomerStrategy,
    UserStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
