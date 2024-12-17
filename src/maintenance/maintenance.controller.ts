import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common'
import { MaintenanceService } from './maintenance.service'
import { CreateMaintenanceDto } from './dto/create-maintenance.dto'
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto'
import { ProjectService } from 'src/project/project.service'

@Controller('maintenance')
export class MaintenanceController {
  constructor (
    private readonly maintenanceService: MaintenanceService,
    readonly projectService: ProjectService,
  ) {}

  @Post()
  create (@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto)
  }

  @Get(':status')
  @Render('admin/maintenance/maintenance')
  async findAll (@Param('status') status: string) {
    const maintenances = await this.maintenanceService.findAll(status)
    let heading = ''
    if (status == 'tat-ca') {
      heading = 'tất cả'
    } else if (status == 'sap-toi') {
      heading = 'sắp tới'
    } else if (status == 'dang-bao-tri') {
      heading = 'đang bảo trì'
    }

    return { heading, maintenances, activeMenu: 'maintenance' }
  }

  @Get('project/:idProject')
  @Render('admin/maintenance/maintenance_w_project')
  async findAllWProject (@Param('idProject') idProject: string) {
    const maintenanceWProjects = await this.maintenanceService.findAllWProject(
      +idProject,
    )
    const project = await this.projectService.findOne(+idProject)
    return { project, maintenanceWProjects, activeMenu: 'maintenance' }
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
