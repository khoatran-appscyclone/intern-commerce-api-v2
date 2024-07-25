import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto, UpdateCartDto } from './carts.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  create(createCartDto: CreateCartDto) {
    return this.prisma.cart.create({ data: createCartDto });
  }

  findAllByCustomerId(customerId: number) {
    return this.prisma.cart.findMany({ where: { customerId } });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({ where: { id }, data: updateCartDto });
  }

  remove(id: number) {
    return this.prisma.cart.delete({ where: { id } });
  }
}
