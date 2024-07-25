import { faker } from '@faker-js/faker';
import { CustomerEligibility, DiscountType } from '@prisma/client';
import { CreateCategoryDto } from 'src/categories/categories.dto';
import { CreateCollectionDto } from 'src/collections/colletions.dto';
import {
  CreateCustomerAddressDTO,
  CreateCustomerDto,
} from 'src/customers/customers.dto';
import { CreateDiscountOrderDto } from 'src/discount-orders/discount-orders.dto';
import { CreateProductDto } from 'src/products/products.dto';
import { CreateUserDto } from 'src/users/users.dto';
import { CreateVendorDto } from 'src/vendors/vendors.dto';

export const countModel = {
  vendor: 40,
  category: 20,
  product: 50,
  user: 10,
  customer: 50,
  collection: 10,
  order: 5000,
  discountOrder: 100,
};

export function generateProducts(count: number): CreateProductDto[] {
  const products: CreateProductDto[] = [];

  for (let i = 0; i < count; i++) {
    const product: CreateProductDto = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(100),
      price: parseFloat(faker.commerce.price()),
      categoryId: faker.datatype.number({ min: 1, max: 10 }), // Adjust min and max as per your category IDs
      vendorId: faker.datatype.number({ min: 1, max: 10 }), // Adjust min and max as per your vendor IDs
      thumbnail: null, // Assuming no thumbnail for simplicity
      inventory: faker.datatype.number({ min: 0, max: 1000 }),
    };

    products.push(product);
  }

  return products;
}

export function generateCategories(count: number): CreateCategoryDto[] {
  const categories: CreateCategoryDto[] = [];

  for (let i = 0; i < count; i++) {
    const category: CreateCategoryDto = {
      name: faker.commerce.department(), // Generate a fake category name
      active: faker.datatype.boolean(), // Generate a random boolean for active status
    };
    categories.push(category);
  }

  return categories;
}

function generateVendorData(): CreateVendorDto {
  const vendorDto = new CreateVendorDto();
  vendorDto.name = faker.company.name();
  vendorDto.description = faker.lorem.sentence();
  vendorDto.imageUrl = faker.image.imageUrl();
  return vendorDto;
}

export function generateVendors(count: number): CreateVendorDto[] {
  const vendors: CreateVendorDto[] = [];
  for (let i = 0; i < count; i++) {
    vendors.push(generateVendorData());
  }
  return vendors;
}

export function generateCustomers(count: number): CreateCustomerDto[] {
  const customers: CreateCustomerDto[] = [];

  for (let i = 0; i < count; i++) {
    const customer = new CreateCustomerDto();

    customer.username = faker.internet.userName();
    customer.password = faker.internet.password();
    customer.fullname = faker.name.fullName();
    customer.email = faker.internet.email();
    customer.phoneNumber = faker.phone.number('091#######');
    customer.avatar = faker.image.avatar();
    customers.push(customer);
  }

  return customers;
}

export const generateUsers = (num: number): CreateUserDto[] => {
  const users: CreateUserDto[] = [];

  for (let i = 0; i < num; i++) {
    const user = new CreateUserDto();
    user.username = faker.internet.userName();
    user.password = faker.internet.password();
    user.fullname = faker.name.fullName();
    user.email = faker.internet.email();

    users.push(user);
  }

  return users;
};

export function generateCollections(count: number): CreateCollectionDto[] {
  const collections: CreateCollectionDto[] = [];

  for (let i = 0; i < count; i++) {
    const collection: CreateCollectionDto = {
      id: faker.datatype.number(), // Generate a random number for id
      name: faker.random.words(3), // Generate a random name (3 words)
      description: faker.lorem.sentence(50), // Generate a random description sentence
      imageUrl: faker.image.imageUrl(), // Generate a random image URL
      productIds: Array.from(
        { length: faker.datatype.number({ min: 1, max: 10 }) },
        () => faker.datatype.number({ min: 1, max: 100 }),
      ), // Generate an array of random product ids (1 to 10 ids)
    };

    collections.push(collection);
  }

  return collections;
}

export const generateDiscountOrder = (
  count: number,
): CreateDiscountOrderDto[] => {
  return Array.from({ length: count }, () => ({
    code: faker.random.alphaNumeric(10).toUpperCase(), // Generate a random discount code
    type: faker.helpers.arrayElement([
      DiscountType.Percentage,
      DiscountType.Fixed,
    ]), // Randomly pick a discount type
    value: faker.datatype.number({ min: 5, max: 50 }), // Random discount value between 5 and 50
    minAmount: faker.datatype.number({ min: 50, max: 500 }), // Minimum amount for discount
    minQuantity: faker.datatype.number({ min: 1, max: 10 }), // Minimum quantity for discount
    numberApply: faker.datatype.number({ min: 1, max: 10 }), // Number of times discount can be applied
    customerEligibility: faker.helpers.arrayElement([
      CustomerEligibility.All,
      CustomerEligibility.Specific,
    ]), // Randomly pick customer eligibility
    startAt: faker.date.future(), // Random start date in the future
    endAt: faker.date.between(
      new Date(),
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    ), // Random end date within 30 days
    discountOrderCustomerSpecific: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      () => faker.datatype.number({ min: 1, max: 100 }),
    ), // Random specific customers
  }));
};

export function generateCustomerAddresses(
  count: number,
): CreateCustomerAddressDTO[] {
  const addresses: CreateCustomerAddressDTO[] = [];

  for (let i = 0; i < count; i++) {
    const address: CreateCustomerAddressDTO = {
      name: faker.company.name(), // Generates a random name
      province: faker.address.state(), // Generates a random province/state
      district: faker.address.city(), // Generates a random city
      commune: faker.address.cityName(), // Generates a random commune area
      address: faker.address.streetAddress(), // Generates a random street address
      customerId: faker.datatype.number({ min: 1, max: 100 }), // Generates a random customer ID
    };

    addresses.push(address);
  }

  return addresses;
}
