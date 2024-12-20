import { Injectable } from '@nestjs/common'
import { CreateProjectStepDto } from './dto/create-project_step.dto'
import { UpdateProjectStepDto } from './dto/update-project_step.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProjectStep } from './entities/project_step.entity'
import { Project } from 'src/project/entities/project.entity'
import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'
import { Staff } from 'src/staffs/entities/staff.entity'

@Injectable()
export class ProjectStepsService {
  constructor (
    @InjectRepository(ProjectStep)
    private projectStepRepository: Repository<ProjectStep>,
  ) {}
  create (createProjectStepDto: CreateProjectStepDto) {
    return this.projectStepRepository.save(createProjectStepDto)
  }
  findByProject(projectId: number) {
    return this.projectStepRepository.find({
      where: {
        project: {
          id: projectId,
        },
      }
    })
  }

  findWdataUpdate (staffId, workflowStepId, projectId) {
    return this.projectStepRepository.find({
      where: {
        staff: {
          id: staffId,
        },
        workflowStep: {
          id: workflowStepId,
        },
        project: {
          id: projectId,
        },
      },
    })
  }

  async findWProject (id: number) {
    return await this.projectStepRepository.find({
      where: {
        project: {
          id: id,
        },
      },
    })
  }
  async findWProjectAStatus (id: number) {
    return await this.projectStepRepository.find({
      where: {
        project: {
          id: id,
        },
        status: 0,
      },
    })
  }

  findOne (id: number) {
    return this.projectStepRepository.findOne({
      where: { id },
      relations: ['staff','project','workflowStep.step']
    });
  }
  async findProject (id: number) {
    const projectSteps = await this.projectStepRepository.find({
      where: {
        project: {
          id: id,
        },
      },
      relations: [
        'workflowStep',
        'project',
        'staff',
        'workflowStep.step',
        'workflowStep.workflow',
      ],
    })
    return projectSteps.map(projectStep => {
      const workflowStep = projectStep.workflowStep
      const step = workflowStep ? workflowStep.step : null
      const workflow = workflowStep ? workflowStep.workflow : null
      return {
        ...projectStep,
        step: step,
        workflow: workflow,
      }
    })
  }
  findDataWIdStaff (id: number) {
    return this.projectStepRepository.find({
      where: {
        staff: {
          id: id,
        },
      },
      order: {
        status: 'ASC',
        createdAt: 'DESC',
      },
      relations: [
        'workflowStep',
        'project',
        'workflowStep.step',
        'workflowStep.workflow',
      ],
    })
  }

  update (id: number, updateProjectStepDto: UpdateProjectStepDto) {
    return `This action updates a #${id} projectStep`
  }

  async findWWorkflowStepsStaffProject (
    project: Project,
    workflowStep: WorkflowStep,
    staff: Staff,
  ): Promise<any | undefined> {
    const projectQuery = {
      id: project.id,
      full_name: project.full_name,
      number_phone: project.number_phone,
      email: project.email,
      address: project.address,
      description: project.description,
      status: project.status,
    }
    const value = await this.projectStepRepository.find({
      where: {
        project: projectQuery,
        workflowStep: { id: workflowStep.id },
        staff: { id: staff.id },
      }
    })
    return value
  }
  async removeProjectSteps (project: Project): Promise<void> {
    await this.projectStepRepository.delete({ project: { id: project.id } })
  }
  async delete (id:number): Promise<void> {
    await this.projectStepRepository.delete(id)
  }
  async updateStatusWProjectAWorkflowSteps (
    image: string,
    feedback: string,
    staff: object,
    project: object,
    workflowStep: object,
  ) {
    await this.projectStepRepository.update(
      { project, workflowStep },
      {
        status: 1,
      },
    )
    await this.projectStepRepository.update(
      { project, workflowStep, staff },
      {
        status: 1,
        image,
        feedback,
      },
    )
  }
}
