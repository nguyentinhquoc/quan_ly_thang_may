import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkflowStepDto } from './create-workflow_step.dto';

export class UpdateWorkflowStepDto extends PartialType(CreateWorkflowStepDto) {}
