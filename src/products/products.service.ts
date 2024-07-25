import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductImageDto,
} from './products.dto';
import { slugProduct } from 'src/shared/utils/slug';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        slug: slugProduct(createProductDto.name),
        isDiscounting: false,
        discountPrice: createProductDto.price,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    const options = {
      search: '',
      vendorIds: [] as number[],
      categoriesIds: [] as number[],
      minPrice: 0,
      maxPrice: 0,
      minInventory: 0,
      maxInventory: 0,
      active: true,
      discounted: false,
      collectionIds: [] as number[],
      rate: 0,
      sort: {
        sortBy: '',
        sortDirection: '',
      },
      paginate: {
        limit: 12,
        page: 1,
      },
    };

    const whereClause = {
      name: { contains: options.search },
      vendorId: { in: options.vendorIds },
      categoryId: { in: options.categoriesIds },
      price: {
        gt: options.minPrice,
        lt: options.maxPrice,
      },
      inventory: {
        gt: options.minInventory,
        lt: options.maxInventory,
      },
      isDiscounting: options.discounted,
      rate: options.rate,
      active: options.active,
    };

    const orderByClause = {
      [options.sort.sortBy]: options.sort.sortDirection,
    };

    return this.prisma.product.findMany({
      where: {
        AND: [whereClause],
      },
      orderBy: [orderByClause],
      take: options.paginate.limit,
      skip: options.paginate.page,
    });
  }

  async findOne(id: number): Promise<Product> {
    return await this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        productImage: true,
      },
    });
  }

  async update(
    id: number,
    updateProductto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProductto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.product.delete({
      where: { id },
    });
  }

  addImage(updateProductImageDto: UpdateProductImageDto) {
    return this.prisma.productImage.createMany({
      data: updateProductImageDto.urls.map((url) => ({
        productId: updateProductImageDto.productId,
        url,
      })),
    });
  }

  removeImage(url: string) {
    return this.prisma.productImage.deleteMany({ where: { url } });
  }

  getProductForExportCsv() {
    return this.prisma.product.findMany();
  }
}
