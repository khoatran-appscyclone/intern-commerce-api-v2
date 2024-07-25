import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { CreateVendorDto, UpdateVendorDto } from './vendors.dto';

@ApiTags('vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorService: VendorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new vendor',
    description:
      'This endpoint allows you to create a new vendor by providing the necessary vendor information in the request body.',
  })
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all vendors',
    description:
      'This endpoint fetches a list of all vendors available in the system.',
  })
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a vendor by ID',
    description:
      'This endpoint retrieves a specific vendor using the vendor ID provided in the URL path.',
  })
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a vendor',
    description:
      'This endpoint updates the details of an existing vendor with the provided ID and new information in the request body.',
  })
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a vendor',
    description:
      'This endpoint deletes a vendor from the system using the vendor ID supplied in the URL path.',
  })
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
