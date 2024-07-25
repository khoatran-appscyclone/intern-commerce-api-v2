import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'admin001' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'admin001' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'admin001@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;
}
