import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { CustomersModule } from './customers/customers.module';
import { CollectionsModule } from './collections/collections.module';
import { VendorsModule } from './vendors/vendors.module';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';
import { UploadModule } from './upload/upload.module';
import { DiscountOrdersModule } from './discount-orders/discount-orders.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { CsvModule } from './csv/csv.module';

@Module({
  // controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CategoriesModule,
    VendorsModule,
    ProductsModule,
    CollectionsModule,
    CustomersModule,
    CartsModule,
    UploadModule,
    DiscountOrdersModule,
    CronjobModule,
    CsvModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
