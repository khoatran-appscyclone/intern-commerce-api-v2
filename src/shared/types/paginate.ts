import { IsInt, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateDto {
  @ApiProperty({
    description: 'Page number for pagination',
    type: Number,
    default: 1,
    required: false,
  })
  @IsInt({ message: 'Page must be an integer.' })
  @IsOptional() // This means the field is optional
  @IsPositive({ message: 'Page must be a positive number.' })
  page?: number = 1; // Default value

  @ApiProperty({
    description: 'Number of items per page',
    type: Number,
    default: 12,
    required: false,
  })
  @IsInt({ message: 'Limit must be an integer.' })
  @IsOptional() // This means the field is optional
  @IsPositive({ message: 'Limit must be a positive number.' })
  limit?: number = 12; // Default value
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
