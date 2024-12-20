import { Injectable } from '@nestjs/common'
import { CreateProjectEditDto } from './dto/create-project_edit.dto'
import { UpdateProjectEditDto } from './dto/update-project_edit.dto'
import { ProjectEdit } from './entities/project_edit.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ProjectEditService {
  constructor (
    @InjectRepository(ProjectEdit)
    private readonly projectEditRepository: Repository<ProjectEdit>,
  ) {}
  async create (createProjectEditDto: CreateProjectEditDto) {
    return await this.projectEditRepository.save({
      full_name: createProjectEditDto.full_name,
      number_phone: createProjectEditDto.number_phone,
      email: createProjectEditDto.email,
      address: createProjectEditDto.address,
      staff: createProjectEditDto.staff,
      project: createProjectEditDto.project,
      infor_product: createProjectEditDto.infor_product,
    })
  }

  async findAll() {
    return await this.projectEditRepository.find({
      relations: ['staff', 'project'],
      order: {
        createdAt: 'DESC',
      },
    });
  }


  findOne (id: number) {
    return this.projectEditRepository.findOne({
      where: { id },
      relations: ['staff', 'project'],
    })
  }

  update (id: number, updateProjectEditDto: UpdateProjectEditDto) {
    return `This action updates a #${id} projectEdit`
  }

  remove (id: number) {
    return `This action removes a #${id} projectEdit`
  }
}
