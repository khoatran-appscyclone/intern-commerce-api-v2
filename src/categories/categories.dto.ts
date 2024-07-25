import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category', example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Whether the category is active', example: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
