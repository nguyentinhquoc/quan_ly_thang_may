import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceActionDto } from './create-maintenance_action.dto';

export class UpdateMaintenanceActionDto extends PartialType(CreateMaintenanceActionDto) {}
