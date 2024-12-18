import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { MaintenanceActionsService } from './maintenance_actions.service'
import { CreateMaintenanceActionDto } from './dto/create-maintenance_action.dto'
import { UpdateMaintenanceActionDto } from './dto/update-maintenance_action.dto'
import { MaintenanceService } from 'src/maintenance/maintenance.service'
import { StaffsService } from 'src/staffs/staffs.service'

@Controller('maintenance-actions')
export class MaintenanceActionsController {
  constructor (
    private readonly maintenanceActionsService: MaintenanceActionsService,
    readonly maintenanceService: MaintenanceService,
    readonly staffsService: StaffsService,
  ) {}

  @Post()
  async create (@Body() createMaintenanceActionDto: CreateMaintenanceActionDto) {
    return this.maintenanceActionsService.create(createMaintenanceActionDto)
  }

  @Get()
  findAll () {
    return this.maintenanceActionsService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.maintenanceActionsService.findOne(+id)
  }

  @Patch(':id')
  update (
    @Param('id') id: string,
    @Body() updateMaintenanceActionDto: UpdateMaintenanceActionDto,
  ) {
    return this.maintenanceActionsService.update(
      +id,
      updateMaintenanceActionDto,
    )
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.maintenanceActionsService.remove(+id)
  }
}
