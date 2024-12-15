import { forwardRef, Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { Project } from './entities/project.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkflowStepsModule } from 'src/workflow_steps/workflow_steps.module'
import { WorkflowsModule } from 'src/workflows/workflows.module'
import { CustomersModule } from 'src/customers/customers.module'
import { StepsModule } from 'src/steps/steps.module'
import { StaffsModule } from 'src/staffs/staffs.module'
import { ProjectStepsModule } from 'src/project_steps/project_steps.module'
import { ProjectEditModule } from 'src/project_edit/project_edit.module'
import { NotificationModule } from 'src/notification/notification.module'
import { SendMailService } from 'src/send-mail/send-mail.service'

@Module({
  imports: [TypeOrmModule.forFeature([Project]), WorkflowsModule, CustomersModule, StepsModule, WorkflowStepsModule, StaffsModule, ProjectStepsModule, NotificationModule,forwardRef(() => ProjectEditModule),],
  controllers: [ProjectController],
  providers: [ProjectService, SendMailService],
  exports: [ProjectService],
})
export class ProjectModule {}
