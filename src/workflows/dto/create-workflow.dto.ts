import { IsNotEmpty, IsString } from 'class-validator'

export class CreateWorkflowDto {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsString()
  description: string
}
