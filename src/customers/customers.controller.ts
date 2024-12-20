import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @SetMetadata('role_admin', true)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @SetMetadata('role_admin', true)
 async findAll() {
    await this.customersService.findAll();
    return { activeMenu: 'customer' };
  }

  @Get(':id')
  @SetMetadata('role_admin', true)
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
    return { activeMenu: 'customer' };
  }

  @Patch(':id')
  @SetMetadata('role_admin', true)
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @SetMetadata('role_admin', true)
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
