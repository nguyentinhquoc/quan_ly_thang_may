import { Injectable } from '@nestjs/common'
import { CreateWorkflowStepDto } from './dto/create-workflow_step.dto'
import { UpdateWorkflowStepDto } from './dto/update-workflow_step.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Workflow } from 'src/workflows/entities/workflow.entity'
import { Repository } from 'typeorm'
import { WorkflowStep } from './entities/workflow_step.entity'
import { Step } from 'src/steps/entities/step.entity'
@Injectable()
export class WorkflowStepsService {
  constructor (
    @InjectRepository(WorkflowStep)
    private workflowStepRepository: Repository<WorkflowStep>,

    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,

    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}
  async create (createWorkflowStepDto: CreateWorkflowStepDto) {
    const step = await this.stepRepository.findOne({
      where: { id: createWorkflowStepDto.stepId },
    })
    const workflow = await this.workflowRepository.findOne({
      where: { id: createWorkflowStepDto.workflowId },
    })
    if (!step) {
      throw new Error('Step not found')
    }
    if (!workflow) {
      throw new Error('Workflow not found')
    }
    const workflowStep = await this.workflowStepRepository.create({
      step,
      workflow,
    })
    return await this.workflowStepRepository.save(workflowStep)
  }

  findWorkflow (id: number) {
    return this.workflowStepRepository.find({
      where: { workflow: { id } },
      relations: ['step', 'workflow'],
    })
  }

  findAll () {
    return this.workflowStepRepository.find({
      relations: ['workflow', 'step'],
    })
  }

  async findOne (id: number) {
    return this.workflowStepRepository.findOne({
      where: { id },
    })
  }

  update (id: number, updateWorkflowStepDto: UpdateWorkflowStepDto) {
    return `This action updates a #${id} workflowStep`
  }

  remove (id: number) {
    return this.workflowStepRepository.delete({
      workflow: { id },
    })
  }
}
