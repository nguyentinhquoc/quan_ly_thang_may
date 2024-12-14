import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  SetMetadata,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { WorkflowStepsService } from 'src/workflow_steps/workflow_steps.service'
import { WorkflowsService } from 'src/workflows/workflows.service'
import { CustomersService } from 'src/customers/customers.service'
import { Response } from 'express'
import { StepsService } from 'src/steps/steps.service'
import { StaffsService } from 'src/staffs/staffs.service'
import { ProjectStepsService } from 'src/project_steps/project_steps.service'
import { ProjectEdit } from '../project_edit/entities/project_edit.entity'
import { ProjectEditService } from 'src/project_edit/project_edit.service'
@Controller('project')
export class ProjectController {
  constructor (
    private readonly projectService: ProjectService,
    private readonly workflowsService: WorkflowsService,
    private readonly workflowStepsService: WorkflowStepsService,
    private readonly customerService: CustomersService,
    private readonly stepsService: StepsService,
    private readonly staffsService: StaffsService,
    private readonly projectStepsService: ProjectStepsService,
    private readonly projectEditService: ProjectEditService,
  ) {}
  @Post()
  async create (
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
  ) {
    const infor_product = {
      dongCo: createProjectDto.dongCo,
      congSuat: createProjectDto.congSuat,
      tuDien: createProjectDto.tuDien,
      capTai: createProjectDto.capTai,
      hoThang: createProjectDto.hoThang,
      cabin: createProjectDto.cabin,
      cua: createProjectDto.cua,
      pit: createProjectDto.pit,
      oh: createProjectDto.oh,
      baoHanh: createProjectDto.baoHanh,
      baoTri: createProjectDto.baoTri,
    }
    const newProject = {
      ...createProjectDto,
      infor_product: JSON.stringify(infor_product),
    }
    console.log(newProject)
    const Project = await this.projectService.create(newProject)
    await this.customerService.create({
      full_name: createProjectDto.full_name,
      number_phone: createProjectDto.number_phone,
      email: createProjectDto.email,
      address: createProjectDto.address,
    })
    const stepsArray = JSON.parse(createProjectDto.steps)
    for (const step of stepsArray) {
      const WorkflowSteps = await this.workflowStepsService.findOne(step.idStep)
      const Staff = await this.staffsService.findOne(step.idStaffCheck)
      await this.projectStepsService.create({
        workflowStep: WorkflowSteps,
        project: Project,
        staff: Staff,
        time: step.date,
      })
    }
    return res.redirect('/project')
  }
  @Patch('/:id')
  async updateP (
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    const project = await this.projectService.findOne(+id)
    const infor_product = {
      dongCo: updateProjectDto.dongCo,
      congSuat: updateProjectDto.congSuat,
      tuDien: updateProjectDto.tuDien,
      capTai: updateProjectDto.capTai,
      hoThang: updateProjectDto.hoThang,
      cabin: updateProjectDto.cabin,
      cua: updateProjectDto.cua,
      pit: updateProjectDto.pit,
      oh: updateProjectDto.oh,
      baoHanh: updateProjectDto.baoHanh,
      baoTri: updateProjectDto.baoTri,
    }
    await this.projectService.update(+id, {
      full_name: updateProjectDto.full_name,
      number_phone: updateProjectDto.number_phone,
      email: updateProjectDto.email,
      address: updateProjectDto.address,
      description: updateProjectDto.description,
      infor_product: JSON.stringify(infor_product),
    })
    const idPhone = await this.customerService.findOneByPhone(
      updateProjectDto.phone_old,
    )
    await this.customerService.update(+idPhone.id, {
      full_name: updateProjectDto.full_name,
      number_phone: updateProjectDto.number_phone,
      email: updateProjectDto.email,
      address: updateProjectDto.address,
    })
    if (updateProjectDto.steps) {
      const ArrayIdProjectStepNew = []
      const ArrayIdProjectStepOld = []
      const stepsArray = await JSON.parse(updateProjectDto.steps)
      for (const step of stepsArray) {
        const WorkflowSteps = await this.workflowStepsService.findOne(
          step.idStep,
        )
        const Staff = await this.staffsService.findOne(step.idStaffCheck)
        const CheckTT =
          await this.projectStepsService.findWWorkflowStepsStaffProject(
            project,
            WorkflowSteps,
            Staff,
          )
        if (CheckTT.length == 0) {
          const addProjectStep = await this.projectStepsService.create({
            workflowStep: WorkflowSteps,
            project: project,
            staff: Staff,
            time: step.date,
          })
          ArrayIdProjectStepNew.push(addProjectStep.id)
        } else {
          for (const CheckT of CheckTT) {
            ArrayIdProjectStepNew.push(CheckT.id)
          }
        }
      }

      const findByProjects = await this.projectStepsService.findByProject(id)
      for (const findByProject of findByProjects) {
        ArrayIdProjectStepOld.push(findByProject.id)
      }
      const ArrayIdProjectStepDelete = ArrayIdProjectStepOld.filter(
        id => !ArrayIdProjectStepNew.includes(id),
      )
      for (id of ArrayIdProjectStepDelete) {
        await this.projectStepsService.delete(+id)
      }
    }
    return res.redirect('/project')
  }
  @Get('/add')
  @Render('admin/projects/add_project')
  async renderAdd () {
    const workflows = await this.workflowsService.findAll()
    const steps = await this.stepsService.findAll()
    const workflowSteps = await this.workflowStepsService.findAll()
    const staffs = await this.staffsService.findAll()
    return {
      workflows,
      steps,
      workflowSteps,
      staffs,
      activeMenu: 'project',
    }
  }
  @Get()
  @SetMetadata('role_admin', true)
  @Render('admin/projects/projects')
  async findAll () {
    const projects = await this.projectService.findAll()
    return {
      projects,
      activeMenu: 'project',
    }
  }
  @Get('/action')
  @SetMetadata('role_admin', true)
  @Render('admin/projects/projects')
  async findAllAction () {
    const projects = await this.projectService.findAllAction()
    return {
      projects,
      activeMenu: 'project',
    }
  }
  @Get('/success')
  @SetMetadata('role_admin', true)
  @Render('admin/projects/projects')
  async findAllSuccess () {
    const projects = await this.projectService.findAlSuccess()
    return {
      projects,
      activeMenu: 'project',
    }
  }
  @Get('/:id')
  @SetMetadata('role_admin', true)
  @Render('admin/projects/edit_project')
  async findOne (@Param('id') id: number) {
    const project = await this.projectService.findOne(+id)
    const staffs = await this.staffsService.findAll()
    const workflows = await this.workflowsService.findAll()
    const steps = await this.stepsService.findAll()
    const ProjectSteps = await this.projectStepsService.findProject(id)
    return {
      project,
      ProjectSteps,
      workflows,
      steps,
      staffs,
      activeMenu: 'project',
    }
  }

  @Get('/detail/:id')
  @SetMetadata('role_admin', true)
  @Render('admin/projects/detail_project')
  async detailProject (
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectService.findOne(+id)
    const projectSteps = await this.projectStepsService.findProject(+id)
    console.log(projectSteps)
    return { projectSteps, project, activeMenu: 'project' }
  }

  @Get('/checkEdit/:projectEdit')
  @SetMetadata('role_admin', true)
  @Render('admin/projects/checkEdit_project')
  async checkEdit (@Param('projectEdit') projectEditId: number) {
    const projectEdit = await this.projectEditService.findOne(+projectEditId)
    const project = await this.projectService.findOne(+projectEdit.project.id)
    console.log(project)
    return { projectEdit, project, activeMenu: 'project' }
  }
}
