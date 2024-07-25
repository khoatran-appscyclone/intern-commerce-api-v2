import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCustomerDto,
  GetAllCustomerQuery,
  UpdateCustomerDto,
} from './customers.dto';
import { hashPassword } from 'src/shared/utils/hashPassword';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from 'src/auth/auth.dto';
import { pick } from 'src/shared/utils/object';
import { randomString } from 'src/shared/utils/randomString';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const password = await hashPassword(createCustomerDto.password);
    createCustomerDto.password = password;
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async findAll(query: GetAllCustomerQuery) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    const take = limit;

    let whereClause = {};

    if (query.searchBy && query.searchValue) {
      whereClause = { [query.searchBy]: { contains: query.searchValue } };
    }

    const [customers, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        where: whereClause,
        skip,
        take,
      }),
      this.prisma.customer.count({ where: whereClause }),
    ]);
    return {
      data: customers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return this.prisma.customer.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  remove(id: number) {
    return this.prisma.customer.update({
      where: { id },
      data: { active: false },
    });
  }

  async auth(customerDto: LoginAuthDto) {
    const customer = await this.prisma.customer.findFirst({
      where: { username: customerDto.username },
    });
    if (!customer) {
      throw new NotFoundException('Username or Password incorrect');
    }
    const isMatch = await bcrypt.compare(
      customerDto.password,
      customer.password,
    );
    if (!isMatch) {
      throw new NotFoundException('Username or Password incorrect');
    }

    return {
      ...pick(customer, ['id', 'username', 'fullname']),
      role: 'Customer',
    };
  }

  async resetPassword(id: number) {
    const rawPassword = randomString(10);
    const newPassword = await hashPassword(rawPassword);

    const customer = await this.prisma.customer.update({
      where: { id },
      data: { password: newPassword },
    });
    return { ...customer, rawPassword };
  }
}
