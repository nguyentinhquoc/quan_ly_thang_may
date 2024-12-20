import { IsDate, IsNotEmpty, IsString } from 'class-validator'
import { Project } from 'src/project/entities/project.entity'

export class CreateMaintenanceDto {
  @IsString()
  @IsNotEmpty()
  time: string
  @IsNotEmpty()
  project: Project
  reason?: string
}
