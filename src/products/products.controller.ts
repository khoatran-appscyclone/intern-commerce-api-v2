import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductImageDto,
} from './products.dto';
import { ProductsService } from './products.service';
import { CsvService } from 'src/csv/csv.service';
import { randomString } from 'src/shared/utils/randomString';
import { getFilePath } from 'src/shared/utils/getFilePath';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly csvService: CsvService,
  ) {}

  @Post()
  create(@Body() createVendorDto: CreateProductDto) {
    return this.productsService.create(createVendorDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Post('images')
  addImage(@Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productsService.addImage(updateProductImageDto);
  }

  @Delete('images/:url')
  removeImage(@Param('url') url: string) {
    return this.productsService.removeImage(url);
  }

  @Post('export-csv')
  async exportCsv() {
    const data = await this.productsService.getProductForExportCsv();
    const fileName = `${randomString(10)}.csv`;
    const filePath = `./assets/${fileName}`;
    await this.csvService.exportToCsv(data, filePath);
    return {
      message: 'Export successfully',
      filePath: getFilePath(fileName),
    };
  }
}
