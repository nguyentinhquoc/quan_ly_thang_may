import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) { }
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save(createCustomerDto);
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }
  findOneByPhone(number_phone: string) {
    return this.customerRepository.findOne({
      where: {
        number_phone,
      },
    });
  }

 async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepository.update(id, updateCustomerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
