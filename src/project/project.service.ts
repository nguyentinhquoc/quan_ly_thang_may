import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from './entities/project.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProjectService {
  constructor (
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  create (createProjectDto: CreateProjectDto) {
    return this.projectRepository.save({
      full_name : createProjectDto.full_name,
      number_phone: createProjectDto.number_phone,
      email: createProjectDto.email,
      address: createProjectDto.address,
      infor_product: createProjectDto.infor_product,
    })
  }
  findAll () {
    return this.projectRepository.find()
  }
  findAllAction () {
    return this.projectRepository.find({where: {status: 0}})
  }
  findAlSuccess () {
    return this.projectRepository.find({ where: { status: 1 } })
  }


  findOne(id: number) {
    return this.projectRepository.findOne({ where: { id } })
  }
  update (id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto)
  }
        // await this.projectService.updateStatusProject(project.id, 1)

 async updateStatusProject (id: number, status: number) {
  return  await this.projectRepository.update(id, { status })
  }

  remove (id: number) {
    return `This action removes a #${id} project`
  }
}
