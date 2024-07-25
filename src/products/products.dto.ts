import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'This is a product description',
    maxLength: 240,
  })
  @IsString()
  @IsOptional()
  @MaxLength(240)
  description?: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  vendorId: number;

  @ApiPropertyOptional({ example: null })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  inventory: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class UpdateProductImageDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ type: () => [String], isArray: true, example: ['image.png'] })
  urls: string[];
}

export class ProductFilterDto {
  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  search?: string;

  vendorIds?: number[];
  categoriesIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  minInventory?: number;
  maxInventory?: number;
  active?: boolean;
  discounted?: boolean;
  collectionIds?: number[];
  rate?: number;
  sort?: {
    sortBy?: string;
    sortDirection?: string;
  };
  paginate?: {
    limit?: number;
    page?: number;
  };
}
