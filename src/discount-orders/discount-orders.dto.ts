import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { CustomerEligibility, DiscountType } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDiscountOrderDto {
  @ApiProperty({ example: 'SUMMER2024', description: 'Discount code' })
  @IsString()
  code: string;

  @ApiProperty({ enum: DiscountType, description: 'Type of discount' })
  @IsEnum(DiscountType)
  type: DiscountType;

  @ApiProperty({ example: 10, description: 'Value of the discount' })
  @IsNumber()
  value: number;

  @ApiPropertyOptional({
    required: false,
    example: 100,
    description: 'Minimum amount required to apply discount',
  })
  @IsOptional()
  @IsNumber()
  minAmount?: number;

  @ApiPropertyOptional({
    required: false,
    example: 2,
    description: 'Minimum quantity required to apply discount',
  })
  @IsOptional()
  @IsInt()
  minQuantity?: number;

  @ApiProperty({
    example: 1,
    description: 'Number of times discount can be applied',
  })
  @IsInt()
  numberApply: number;

  @ApiProperty({
    enum: CustomerEligibility,
    description: 'Eligibility criteria for customers',
  })
  @IsEnum(CustomerEligibility)
  customerEligibility: CustomerEligibility;

  @ApiProperty({
    example: '2024-07-01T00:00:00Z',
    description: 'Start date of the discount',
  })
  @IsDate()
  startAt: Date;

  @ApiProperty({
    example: '2024-07-31T23:59:59Z',
    description: 'End date of the discount',
  })
  @IsDate()
  endAt: Date;

  @ApiPropertyOptional({
    isArray: true,
    type: 'integer',
    example: [1, 2, 3],
    description: 'List of specific customers eligible for the discount',
  })
  @IsArray()
  discountOrderCustomerSpecific?: number[];
}

export class UpdateDiscountOrderDto extends OmitType(CreateDiscountOrderDto, [
  'discountOrderCustomerSpecific',
]) {}
