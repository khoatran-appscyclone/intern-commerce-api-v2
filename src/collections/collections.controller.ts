import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
  UpdateProductsToCollectionDto,
} from './colletions.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @ApiOperation({ summary: 'Create a new collection' })
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @ApiOperation({ summary: 'Get all collections' })
  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @ApiOperation({ summary: 'Get a collection by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a collection by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(+id, updateCollectionDto);
  }

  @ApiOperation({ summary: 'Delete a collection by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id);
  }

  @ApiOperation({ summary: 'Add products to a collection' })
  @Post('add/products')
  addProduct(@Body() dto: UpdateProductsToCollectionDto) {
    return this.collectionsService.addProducts(dto);
  }

  @ApiOperation({ summary: 'Remove products from a collection' })
  @Post('remove/products')
  removeProduct(@Body() dto: UpdateProductsToCollectionDto) {
    return this.collectionsService.removeProducts(dto);
  }
}
