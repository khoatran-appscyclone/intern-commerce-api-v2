import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user and return access and refresh tokens' })
  @ApiBody({
    schema: { example: { username: 'admin001', password: '123456789' } },
  })
  @ApiResponse({ status: 201, description: 'Tokens returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('user'))
  @Post('user/login')
  async loginUser(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Access token refreshed successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('user/refresh')
  async refreshUser(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @ApiOperation({
    summary: 'Login customer and return access and refresh tokens',
  })
  @ApiBody({
    schema: { example: { username: 'customer001', password: '123456789' } },
  })
  @ApiResponse({ status: 201, description: 'Tokens returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('customer'))
  @Post('customer/login')
  async loginCustomer(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Access token refreshed successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('customer/refresh')
  async refreshCustomer(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
