import { Module } from '@nestjs/common'
import { MaintenanceActionsService } from './maintenance_actions.service'
import { MaintenanceActionsController } from './maintenance_actions.controller'
import { MaintenanceAction } from './entities/maintenance_action.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MaintenanceModule } from 'src/maintenance/maintenance.module'
import { StaffsModule } from 'src/staffs/staffs.module'
import { ProjectModule } from 'src/project/project.module'
import { NotificationModule } from 'src/notification/notification.module'
import { SendMailService } from 'src/send-mail/send-mail.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([MaintenanceAction]),
    MaintenanceModule,
    StaffsModule,
    ProjectModule,
    NotificationModule,
  ],
  controllers: [MaintenanceActionsController],
  providers: [MaintenanceActionsService, SendMailService],
  exports: [MaintenanceActionsService],
})
export class MaintenanceActionsModule {}
