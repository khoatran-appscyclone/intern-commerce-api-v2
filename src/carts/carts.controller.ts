import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { UpdateCartDto, CreateCartDto } from './carts.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new cart',
    description: 'Creates a new cart for a customer',
  })
  @ApiBody({ type: CreateCartDto })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get(':customerId')
  @ApiOperation({
    summary: 'Get all carts by customer ID',
    description: 'Retrieves all carts associated with a specific customer',
  })
  @ApiParam({ name: 'customerId', description: 'Customer ID' })
  get(@Param('customerId') customerId: string) {
    return this.cartsService.findAllByCustomerId(+customerId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a cart by ID',
    description: 'Updates the details of a cart',
  })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiBody({ type: UpdateCartDto })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a cart by ID',
    description: 'Deletes a cart from the system',
  })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
