import { Module } from '@nestjs/common'
import { MaintenanceActionsService } from './maintenance_actions.service'
import { MaintenanceActionsController } from './maintenance_actions.controller'
import { MaintenanceAction } from './entities/maintenance_action.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MaintenanceModule } from 'src/maintenance/maintenance.module'
import { StaffsModule } from 'src/staffs/staffs.module'

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceAction]), MaintenanceModule,StaffsModule],
  controllers: [MaintenanceActionsController],
  providers: [MaintenanceActionsService],
  exports: [MaintenanceActionsService],
})
export class MaintenanceActionsModule {}
