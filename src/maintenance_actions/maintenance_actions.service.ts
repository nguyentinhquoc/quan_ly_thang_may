import { Injectable } from '@nestjs/common'
import { CreateMaintenanceActionDto } from './dto/create-maintenance_action.dto'
import { UpdateMaintenanceActionDto } from './dto/update-maintenance_action.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MaintenanceAction } from './entities/maintenance_action.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MaintenanceActionsService {
  constructor(
    @InjectRepository(MaintenanceAction)
    private readonly maintenanceActionRepository: Repository<MaintenanceAction>,
  ) {}

 async create(createMaintenanceActionDto: CreateMaintenanceActionDto) {
    return await this.maintenanceActionRepository.save(createMaintenanceActionDto)
  }

  findAll() {
    return `This action returns all maintenanceActions`
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenanceAction`
  }

  update(id: number, updateMaintenanceActionDto: UpdateMaintenanceActionDto) {
    return `This action updates a #${id} maintenanceAction`
  }

  remove(id: number) {
    return `This action removes a #${id} maintenanceAction`
  }
}
