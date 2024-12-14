import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectStepDto } from './create-project_step.dto';

export class UpdateProjectStepDto extends PartialType(CreateProjectStepDto) {}
