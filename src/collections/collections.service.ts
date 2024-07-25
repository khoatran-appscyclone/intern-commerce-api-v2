import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { omit } from 'src/shared/utils/object';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
  UpdateProductsToCollectionDto,
} from './colletions.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}
  async create(createCollectionDto: CreateCollectionDto) {
    const collectionArgs = omit(createCollectionDto, ['productIds']);

    const collections = await this.prisma.collection.create({
      data: {
        ...collectionArgs,
      },
    });
    const colletionProdsArgs = createCollectionDto.productIds.map((prodId) => ({
      colletionId: collections.id,
      productId: prodId,
    }));
    await this.prisma.collectionProduct.createMany({
      data: colletionProdsArgs,
    });
  }

  async findAll() {
    return await this.prisma.collection.findMany({ where: { active: true } });
  }

  async findOne(id: number) {
    return await this.prisma.collection.findFirstOrThrow({
      where: { id },
      include: {
        collectionProduct: true,
      },
    });
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return await this.prisma.collection.update({
      where: { id },
      data: updateCollectionDto,
    });
  }

  async updateProducts(id: number, updateCollectionDto: UpdateCollectionDto) {
    return await this.prisma.collection.update({
      where: { id },
      data: updateCollectionDto,
    });
  }

  async findProducts(id: number) {
    return await this.prisma.collectionProduct.findMany({
      where: { collectionId: id },
    });
  }

  remove(id: number) {
    return this.prisma.collection.update({
      where: { id },
      data: { active: false },
    });
  }

  addProducts(dto: UpdateProductsToCollectionDto) {
    return this.prisma.collectionProduct.createMany({
      data: dto.productIds.map((productId) => ({
        productId,
        collectionId: dto.id,
      })),
    });
  }

  removeProducts(dto: UpdateProductsToCollectionDto) {
    return this.prisma.collectionProduct.deleteMany({
      where: {
        AND: [{ collectionId: dto.id }, { productId: { in: dto.productIds } }],
      },
    });
  }
}
