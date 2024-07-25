import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersAddressService } from './customers-address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomersAddressService,
    PrismaService,
    MailService,
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
