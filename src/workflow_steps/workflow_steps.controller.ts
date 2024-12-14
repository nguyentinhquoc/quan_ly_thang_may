import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
} from '@nestjs/common'
import { WorkflowStepsService } from './workflow_steps.service'
import { CreateWorkflowStepDto } from './dto/create-workflow_step.dto'
import { UpdateWorkflowStepDto } from './dto/update-workflow_step.dto'
@Controller('workflow-steps')
export class WorkflowStepsController {
  constructor(private readonly workflowStepsService: WorkflowStepsService) {}
  @Post()
  @SetMetadata('role_admin', true)
  create(@Body() createWorkflowStepDto: CreateWorkflowStepDto) {
    return this.workflowStepsService.create(createWorkflowStepDto)
  }

  @Get()
  @SetMetadata('role_admin', true)
  findAll() {
    return this.workflowStepsService.findAll()
  }

  @Get(':id')
  @SetMetadata('role_admin', true)
  findOne(@Param('id') id: string) {
    return this.workflowStepsService.findOne(+id)
  }

  @Patch(':id')
  @SetMetadata('role_admin', true)
  update(
    @Param('id') id: string,
    @Body() updateWorkflowStepDto: UpdateWorkflowStepDto,
  ) {
    return this.workflowStepsService.update(+id, updateWorkflowStepDto)
  }

  @Delete(':id')
  @SetMetadata('role_admin', true)
  remove(@Param('id') id: string) {
    return this.workflowStepsService.remove(+id)
  }
}
