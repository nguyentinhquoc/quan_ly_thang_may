import { IsString, IsNotEmpty, IsInt } from 'class-validator';
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
}

