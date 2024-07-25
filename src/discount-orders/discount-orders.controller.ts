import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiscountOrdersService } from './discount-orders.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateDiscountOrderDto,
  UpdateDiscountOrderDto,
} from './discount-orders.dto';
import { BulkActionDeleteDto } from 'src/shared/types/bulk-actions';

@ApiTags('Discount Orders')
@Controller('discount-orders')
export class DiscountOrdersController {
  constructor(private readonly discountOrdersService: DiscountOrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new discount order',
    description: 'Creates a new discount order based on the provided data.',
  })
  create(@Body() createDiscountOrderDto: CreateDiscountOrderDto) {
    return this.discountOrdersService.create(createDiscountOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all discount orders',
    description: 'Fetches a list of all existing discount orders.',
  })
  findAll() {
    return this.discountOrdersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single discount order',
    description: 'Fetches a discount order by its identifier.',
  })
  findOne(@Param('id') id: string) {
    return this.discountOrdersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a discount order',
    description: 'Updates an existing discount order with the provided data.',
  })
  update(
    @Param('id') id: string,
    @Body() updateDiscountOrderDto: UpdateDiscountOrderDto,
  ) {
    return this.discountOrdersService.update(+id, updateDiscountOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a discount order',
    description: 'Deletes a discount order using its identifier.',
  })
  remove(@Param('id') id: string) {
    return this.discountOrdersService.remove(+id);
  }

  @Post('check')
  @ApiOperation({
    summary: 'Check and create a discount order',
    description:
      'Creates a discount order if criteria are met, based on the provided data.',
  })
  check(@Body() createDiscountOrderDto: CreateDiscountOrderDto) {
    return this.discountOrdersService.create(createDiscountOrderDto);
  }

  @Post('bulk-remove')
  @ApiOperation({
    summary: 'Bulk remove discount orders',
    description: 'Deletes multiple discount orders based on an array of ids.',
  })
  bulkRemove(@Body() dto: BulkActionDeleteDto) {
    return this.discountOrdersService.bulkRemove(dto.ids);
  }
}
