import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { Staff } from 'src/staffs/entities/staff.entity'
import { StaffsModule } from 'src/staffs/staffs.module'
import { ProjectStepsModule } from 'src/project_steps/project_steps.module'
import { ProjectModule } from 'src/project/project.module'
import { WorkflowStepsModule } from 'src/workflow_steps/workflow_steps.module'

@Module({
  imports: [
    StaffsModule,
    ProjectStepsModule,
    ProjectModule,
    WorkflowStepsModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
