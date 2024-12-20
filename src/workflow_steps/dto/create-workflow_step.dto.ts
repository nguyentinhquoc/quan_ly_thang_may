import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateWorkflowStepDto {
  @IsInt()
  @IsNotEmpty()
  stepId: number;
  @IsInt()
  @IsNotEmpty()
  workflowId: number;
}
