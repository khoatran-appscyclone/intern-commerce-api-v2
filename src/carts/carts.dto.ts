import { IsInt, Min } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  @IsInt()
  customerId: number;

  @ApiProperty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartDto extends OmitType(CreateCartDto, ['customerId']) {}
