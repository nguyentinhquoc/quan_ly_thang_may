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
} from '@nestjs/common'
import { MaintenanceService } from './maintenance.service'
import { CreateMaintenanceDto } from './dto/create-maintenance.dto'
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto'
import { ProjectService } from 'src/project/project.service'
import { StaffsService } from 'src/staffs/staffs.service'
import { Response } from 'express'

@Controller('maintenance')
export class MaintenanceController {
  constructor (
    private readonly maintenanceService: MaintenanceService,
    readonly projectService: ProjectService,
    readonly staffsService: StaffsService,
  ) {}

  @Post()
  async create (@Res() res: Response,@Body() createMaintenanceDto: CreateMaintenanceDto) {
    await this.maintenanceService.create(createMaintenanceDto)
    return res.redirect('back')
  }

  @Get()
  @Render('admin/maintenance/maintenance')
  async findAll () {
    const maintenances = await this.maintenanceService.findAll()
    return { maintenances, activeMenu: 'maintenance' }
  }

  @Get('project/:idProject')
  @Render('admin/maintenance/maintenance_w_project')
  async findAllWProject (@Param('idProject') idProject: string) {
    const maintenanceWProjects = await this.maintenanceService.findAllWProject(
      +idProject,
    )
    const staffs = await this.staffsService.findAll()
    const project = await this.projectService.findOne(+idProject)
    return { staffs, project, maintenanceWProjects, activeMenu: 'maintenance' }
  }

  @Patch(':id')
  update (
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    return this.maintenanceService.update(+id, updateMaintenanceDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.maintenanceService.remove(+id)
  }
}
