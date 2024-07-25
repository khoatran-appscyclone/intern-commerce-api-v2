import { Module } from '@nestjs/common';
import { DiscountOrdersService } from './discount-orders.service';
import { DiscountOrdersController } from './discount-orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DiscountOrdersController],
  providers: [DiscountOrdersService, PrismaService],
})
export class DiscountOrdersModule {}
