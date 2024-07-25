import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerAddressDTO } from './customers.dto';

@Injectable()
export class CustomersAddressService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerAddressDTO: CreateCustomerAddressDTO) {
    return await this.prisma.customerAddress.create({
      data: createCustomerAddressDTO,
    });
  }

  findAll() {
    return this.prisma.customerAddress.findMany({ where: { active: true } });
  }

  remove(id: number) {
    return this.prisma.customerAddress.update({
      where: { id },
      data: { active: false },
    });
  }
}
