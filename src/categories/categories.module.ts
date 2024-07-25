// src/category/category.module.ts

import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryController } from './categories.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoriesService, PrismaService],
})
export class CategoriesModule {}
