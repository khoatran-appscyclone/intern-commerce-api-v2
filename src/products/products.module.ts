import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CsvService } from 'src/csv/csv.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, CsvService],
})
export class ProductsModule {}
