import { Module } from '@nestjs/common'
import { WorkflowsService } from './workflows.service'
import { WorkflowsController } from './workflows.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workflow } from './entities/workflow.entity'
import { StepsModule } from 'src/steps/steps.module'
import { WorkflowStepsModule } from 'src/workflow_steps/workflow_steps.module'

@Module({
  imports: [TypeOrmModule.forFeature([Workflow]), StepsModule, WorkflowStepsModule],
  controllers: [WorkflowsController],
  providers: [WorkflowsService],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
