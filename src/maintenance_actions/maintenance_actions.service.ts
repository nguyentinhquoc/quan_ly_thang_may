import { Injectable } from '@nestjs/common';
import { CreateMaintenanceActionDto } from './dto/create-maintenance_action.dto';
import { UpdateMaintenanceActionDto } from './dto/update-maintenance_action.dto';

@Injectable()
export class MaintenanceActionsService {
  create(createMaintenanceActionDto: CreateMaintenanceActionDto) {
    return 'This action adds a new maintenanceAction';
  }

  findAll() {
    return `This action returns all maintenanceActions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenanceAction`;
  }

  update(id: number, updateMaintenanceActionDto: UpdateMaintenanceActionDto) {
    return `This action updates a #${id} maintenanceAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintenanceAction`;
  }
}
