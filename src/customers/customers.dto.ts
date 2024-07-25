import { IsString, IsEmail, IsOptional, IsInt, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { PaginateDto } from 'src/shared/types/paginate';

export class CreateCustomerDto {
  @ApiProperty({ example: 'customer001' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'customer001' })
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'customer001@gmail.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '0912938484' })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  avatar?: string;
}

export class UpdateCustomerDto extends OmitType(CreateCustomerDto, [
  'email',
  'username',
  'password',
]) {}

export class CreateCustomerAddressDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name associated with the address',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Ontario',
    description: 'The province of the address',
  })
  @IsString()
  province: string;

  @ApiProperty({
    example: 'Toronto',
    description: 'The district or city of the address',
  })
  @IsString()
  district: string;

  @ApiProperty({
    example: 'York',
    description: 'The commune or area of the address',
  })
  @IsString()
  commune: string;

  @ApiProperty({
    example: '123 Main Street',
    description: 'The specific address details',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the customer associated with this address',
  })
  @IsInt()
  @IsOptional() // CustomerId might be optional depending on your scenario
  customerId: number;
}

export enum CustomerSearchBy {
  Username = 'username',
  Email = 'email',
  Fullname = 'fullname',
  PhoneNumber = 'phoneNumber',
}

export class GetAllCustomerQuery extends PaginateDto {
  @ApiProperty({ required: false, example: 'ABC' })
  @IsString()
  @IsOptional()
  searchValue?: string;

  @ApiProperty({
    enum: CustomerSearchBy,
    default: CustomerSearchBy.Username,
    example: CustomerSearchBy.Username,
    required: false,
  })
  @IsEnum(CustomerSearchBy)
  @IsOptional()
  searchBy?: CustomerSearchBy;
}
