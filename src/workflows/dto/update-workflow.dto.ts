import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkflowDto } from './create-workflow.dto';
import { IsArray, IsEmpty } from 'class-validator';

export class UpdateWorkflowDto extends PartialType(CreateWorkflowDto) {
  forEach(arg0: (element: any) => void) {
    throw new Error('Method not implemented.');
  }
  listStep: number[];
}
