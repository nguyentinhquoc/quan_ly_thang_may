import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Project } from 'src/project/entities/project.entity';
import { Staff } from 'src/staffs/entities/staff.entity';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  staff: Staff;
  @IsNotEmpty()
  project: Project;
}

