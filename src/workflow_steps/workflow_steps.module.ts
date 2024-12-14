import { Module } from '@nestjs/common'
import { WorkflowStepsService } from './workflow_steps.service'
import { WorkflowStepsController } from './workflow_steps.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkflowStep } from './entities/workflow_step.entity'
import { Step } from 'src/steps/entities/step.entity'
import { Workflow } from 'src/workflows/entities/workflow.entity'

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowStep, Step, Workflow])],
  controllers: [WorkflowStepsController],
  providers: [WorkflowStepsService],
  exports: [WorkflowStepsService],
})
export class WorkflowStepsModule {}
