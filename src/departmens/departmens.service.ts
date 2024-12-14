import { Injectable } from '@nestjs/common';
import { CreateDepartmenDto } from './dto/create-departmen.dto';
import { UpdateDepartmenDto } from './dto/update-departmen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/departmen.entity';
import { Repository } from 'typeorm';
@Injectable()
export class DepartmensService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>
  ) { }
  create(createDepartmenDto: CreateDepartmenDto) {
    return this.departmentsRepository.save(createDepartmenDto)
  }
  findAll() {
    return this.departmentsRepository.find()
  }
  findOne(id:any) {
    return this.departmentsRepository.findOne({ where: { id } })
  }
  update(id: number, updateDepartmenDto: UpdateDepartmenDto) {
    return this.departmentsRepository.update(id, updateDepartmenDto);
  }
  remove(id: number) {
    return this.departmentsRepository.softDelete(id);
  }
}
