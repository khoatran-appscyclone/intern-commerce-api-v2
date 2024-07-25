import { Injectable } from '@nestjs/common';
import { CreateDiscountProductDto } from './dto/create-discount-product.dto';
import { UpdateDiscountProductDto } from './dto/update-discount-product.dto';

@Injectable()
export class DiscountProductService {
  create(createDiscountProductDto: CreateDiscountProductDto) {
    return 'This action adds a new discountProduct';
  }

  findAll() {
    return `This action returns all discountProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discountProduct`;
  }

  update(id: number, updateDiscountProductDto: UpdateDiscountProductDto) {
    return `This action updates a #${id} discountProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} discountProduct`;
  }
}
