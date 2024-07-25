import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import {
  countModel,
  generateCategories,
  generateCollections,
  generateCustomerAddresses,
  generateCustomers,
  generateDiscountOrder,
  generateProducts,
  generateUsers,
  generateVendors,
} from './shared/utils/seed';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('generate/categories')
  async generateCategories() {
    const categories = generateCategories(countModel.category);
    return { categories };
  }

  @Post('generate/vendors')
  async generateVendors() {
    const vendors = generateVendors(countModel.vendor);
    return { vendors };
  }

  @Post('generate/products')
  async generateProducts() {
    const products = generateProducts(countModel.product);
    return { products };
  }

  @Post('generate/products')
  async generateUsers() {
    const products = generateUsers(countModel.user);
    return { products };
  }

  @Post('generate/customers')
  async generateCustomers() {
    const customers = generateCustomers(countModel.customer);
    const customerAddress = generateCustomerAddresses(100);
    return { customers, customerAddress };
  }

  @Post('generate/collections')
  async generateCollections() {
    const collections = generateCollections(countModel.collection);
    return { collections };
  }

  @Post('generate/discount-order')
  async generateDiscountOrder() {
    const discounts = generateDiscountOrder(countModel.discountOrder);
    return { discounts };
  }
}
