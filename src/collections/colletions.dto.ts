import {
  IsInt,
  IsString,
  IsOptional,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PickType,
} from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Example Collection' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'A collection of products' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'http://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ type: [], example: [1] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  productIds: number[];
}

export class UpdateCollectionDto extends OmitType(CreateCollectionDto, [
  'id',
  'productIds',
]) {}

export class UpdateProductsToCollectionDto extends PickType(
  CreateCollectionDto,
  ['id', 'productIds'],
) {}
