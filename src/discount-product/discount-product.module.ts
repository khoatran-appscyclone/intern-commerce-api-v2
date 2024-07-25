import { Module } from '@nestjs/common';
import { DiscountProductService } from './discount-product.service';
import { DiscountProductController } from './discount-product.controller';

@Module({
  controllers: [DiscountProductController],
  providers: [DiscountProductService],
})
export class DiscountProductModule {}
