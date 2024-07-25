import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountProductService } from './discount-product.service';
import { CreateDiscountProductDto } from './dto/create-discount-product.dto';
import { UpdateDiscountProductDto } from './dto/update-discount-product.dto';

@Controller('discount-product')
export class DiscountProductController {
  constructor(private readonly discountProductService: DiscountProductService) {}

  @Post()
  create(@Body() createDiscountProductDto: CreateDiscountProductDto) {
    return this.discountProductService.create(createDiscountProductDto);
  }

  @Get()
  findAll() {
    return this.discountProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountProductDto: UpdateDiscountProductDto) {
    return this.discountProductService.update(+id, updateDiscountProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountProductService.remove(+id);
  }
}
