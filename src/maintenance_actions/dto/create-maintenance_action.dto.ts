import { IsNotEmpty } from 'class-validator'
import { Maintenance } from 'src/maintenance/entities/maintenance.entity'
import { Staff } from 'src/staffs/entities/staff.entity'

export class CreateMaintenanceActionDto {
  @IsNotEmpty()
  time: string
  @IsNotEmpty()
  staff: Staff
  @IsNotEmpty()
  maintenance: Maintenance
}
