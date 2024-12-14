import { Module } from '@nestjs/common'
import { ProjectStepsService } from './project_steps.service'
import { ProjectStepsController } from './project_steps.controller'
import { ProjectStep } from './entities/project_step.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectStep])],
  controllers: [ProjectStepsController],
  providers: [ProjectStepsService],
  exports: [ProjectStepsService],
})
export class ProjectStepsModule {}
