import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Vendor } from '@prisma/client';
import { CreateVendorDto, UpdateVendorDto } from './vendors.dto';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(createVendorto: CreateVendorDto): Promise<Vendor> {
    return this.prisma.vendor.create({
      data: createVendorto,
    });
  }

  async findAll(): Promise<Vendor[]> {
    return this.prisma.vendor.findMany();
  }

  async findOne(id: number): Promise<Vendor> {
    return await this.prisma.vendor.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateVendorto: UpdateVendorDto): Promise<Vendor> {
    await this.findOne(id);
    return this.prisma.vendor.update({
      where: { id },
      data: updateVendorto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.vendor.delete({
      where: { id },
    });
  }
}
