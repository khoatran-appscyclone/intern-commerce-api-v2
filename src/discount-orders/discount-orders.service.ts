import { Injectable } from '@nestjs/common';
import { CustomerEligibility } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { omit } from 'src/shared/utils/object';
import {
  CreateDiscountOrderDto,
  UpdateDiscountOrderDto,
} from './discount-orders.dto';

@Injectable()
export class DiscountOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDiscountOrderDto: CreateDiscountOrderDto) {
    const discountOrderArgs = omit(createDiscountOrderDto, [
      'discountOrderCustomerSpecific',
    ]);
    const discountOrder = await this.prisma.discountOrder.create({
      data: discountOrderArgs,
    });

    if (
      createDiscountOrderDto.customerEligibility ===
      CustomerEligibility.Specific
    ) {
      const { discountOrderCustomerSpecific } = createDiscountOrderDto;
      await this.prisma.discountOrderCustomerSpecific.createMany({
        data: discountOrderCustomerSpecific.map((customerId) => ({
          customerId,
          discountOrderId: discountOrder.id,
        })),
      });
    }

    return discountOrder;
  }

  findAll() {
    return this.prisma.discountOrder.findMany({ where: { active: true } });
  }

  findOne(id: number) {
    return this.prisma.discountOrder.findUniqueOrThrow({
      where: { id },
      include: { discountOrderCustomerSpecific: true },
    });
  }

  update(id: number, updateDiscountOrderDto: UpdateDiscountOrderDto) {
    return this.prisma.discountOrder.update({
      where: { id },
      data: updateDiscountOrderDto,
    });
  }

  remove(id: number) {
    return this.prisma.discountOrder.update({
      where: { id },
      data: { active: false },
    });
  }

  bulkRemove(ids: number[]) {
    return this.prisma.discountOrder.updateMany({
      where: { id: { in: ids } },
      data: { active: false },
    });
  }
}
