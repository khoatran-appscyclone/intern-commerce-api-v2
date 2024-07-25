import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserJwtPayload } from 'src/auth/auth.dto';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuardAdmin } from 'src/shared/guards/roles.guard';
import { UserFromToken } from 'src/shared/decorators/user-from-token.decorator';

@ApiTags('Users (user is admin)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @AuthGuardAdmin()
  @ApiOperation({
    summary: 'Retrieve a user',
    description: 'Required admin access token',
  })
  @Get()
  get(@UserFromToken() user: UserJwtPayload) {
    return this.usersService.getById(user.userId);
  }
}
