import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserJwtPayload } from 'src/auth/auth.dto';
import { MailService } from 'src/mail/mail.service';
import { UserFromToken } from 'src/shared/decorators/user-from-token.decorator';
import {
  AuthGuardAdmin,
  AuthGuardAllRoles,
  AuthGuardCustomer,
} from 'src/shared/guards/roles.guard';
import { CustomersAddressService } from './customers-address.service';
import {
  CreateCustomerAddressDTO,
  CreateCustomerDto,
  GetAllCustomerQuery,
  UpdateCustomerDto,
} from './customers.dto';
import { CustomersService } from './customers.service';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly customersAddressService: CustomersAddressService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @AuthGuardAdmin()
  @Get('all')
  @ApiOperation({
    summary: 'Retrieve all customers (This api is only for admins)',
  })
  findAll(@Query() query: GetAllCustomerQuery) {
    return this.customersService.findAll(query);
  }

  @AuthGuardAllRoles({ summary: 'Retrieve a customer' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a customer by ID (This api is only for admins)',
  })
  remove(@Param('id') id: string) {
    return this.customersAddressService.remove(+id);
  }

  @AuthGuardCustomer()
  @Post('address')
  @ApiOperation({ summary: 'Create a new customer address' })
  createAddress(
    @Body() createCustomerAddressDto: CreateCustomerAddressDTO,
    @UserFromToken() user: UserJwtPayload,
  ) {
    return this.customersAddressService.create({
      ...createCustomerAddressDto,
      customerId: user.userId,
    });
  }

  @Get('address')
  @ApiOperation({ summary: 'Retrieve all customers address' })
  findAllAdress() {
    return this.customersAddressService.findAll();
  }

  @Delete('address/:id')
  @ApiOperation({ summary: 'Remove a customer address by ID' })
  removeAddress(@Param('id') id: string) {
    return this.customersAddressService.remove(+id);
  }

  @Patch(':id/reset-password')
  @ApiOperation({ summary: 'Reset a password customer by ID' })
  resetPassword(@Param('id') id: string) {
    return this.customersService.resetPassword(+id);
  }

  // @AuthGuardCustomer()
  // @Get('own')
  // @ApiOperation({
  //   summary: 'Retrieve a customer (API only accept customer token)',
  // })
  // get(@UserFromToken() user: UserJwtPayload) {
  //   return this.customersService.findOne(user.userId);
  // }
}
