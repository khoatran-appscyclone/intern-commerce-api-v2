import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class BulkActionDeleteDto {
  @ApiProperty({
    isArray: true,
    type: 'integer',
    example: [1, 2, 3],
    description: 'List ids',
  })
  @IsArray()
  ids: number[];
}
