import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectEditDto } from './create-project_edit.dto';

export class UpdateProjectEditDto extends PartialType(CreateProjectEditDto) {}
