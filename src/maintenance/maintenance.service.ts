import { Injectable } from '@nestjs/common'
import { CreateMaintenanceDto } from './dto/create-maintenance.dto'
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Maintenance } from './entities/maintenance.entity'
import { Repository } from 'typeorm'
@Injectable()
export class MaintenanceService {
  constructor (
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}
  create (createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceRepository.save(createMaintenanceDto)
  }
  findAll () {
    return this.maintenanceRepository.find({
      relations: ['project', 'maintenanceActions'],
      order: {
        time: 'ASC',
      },
    })
  }

  findAllWProject (idProject: number) {
    return this.maintenanceRepository.find({
      relations: ['project', 'maintenanceActions', 'maintenanceActions.staff'],
      where: {
        project: {
          id: idProject,
        },
      },
      order: {
        time: 'ASC',
      },
    })
  }
  findOne (id: number) {
    return this.maintenanceRepository.findOne({
      relations: ['project', 'maintenanceActions'],
      where: {
        id: id,
      },
    })
  }
  update (id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    return `This action updates a #${id} maintenance`
  }

  remove (id: number) {
    return `This action removes a #${id} maintenance`
  }
}
