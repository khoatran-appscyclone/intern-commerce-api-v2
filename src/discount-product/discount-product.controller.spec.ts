import { Test, TestingModule } from '@nestjs/testing';
import { DiscountProductController } from './discount-product.controller';
import { DiscountProductService } from './discount-product.service';

describe('DiscountProductController', () => {
  let controller: DiscountProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountProductController],
      providers: [DiscountProductService],
    }).compile();

    controller = module.get<DiscountProductController>(DiscountProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
