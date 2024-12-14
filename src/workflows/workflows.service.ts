import { Injectable } from '@nestjs/common'
import { CreateWorkflowDto } from './dto/create-workflow.dto'
import { UpdateWorkflowDto } from './dto/update-workflow.dto'
import { Workflow } from './entities/workflow.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class WorkflowsService {
  constructor (
    @InjectRepository(Workflow)
    private workflowsRepository: Repository<Workflow>,
  ) {}

  async create (createWorkflowDto: CreateWorkflowDto) {
    const workflow = await this.workflowsRepository.save(createWorkflowDto)
    return workflow.id
  }

  findAll () {
    return this.workflowsRepository.find()
  }

  findOne (id: number) {
    return this.workflowsRepository.findOne({ where: { id } })
  }

  update (id: number, updateWorkflowDto: UpdateWorkflowDto) {
    return this.workflowsRepository.update(id, updateWorkflowDto)
  }

  remove (id: number) {
    return `This action removes a #${id} workflow`
  }
}
