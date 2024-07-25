import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty()
  @IsNotEmpty()
  customerAddressId: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  discountPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  note?: string;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  paymentMethod: string;

  @ApiProperty({ type: () => [CreateOrderItemDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateOrderDto {}
