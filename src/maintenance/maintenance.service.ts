import { Injectable } from '@nestjs/common'
import { CreateMaintenanceDto } from './dto/create-maintenance.dto'
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Maintenance } from './entities/maintenance.entity'
import { IsNull, MoreThanOrEqual, Not, Repository } from 'typeorm'

@Injectable()
export class MaintenanceService {
  constructor (
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}
  create (createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceRepository.save(createMaintenanceDto)
  }
  findAll (status) {
    if (status == 'tat-ca') {
      return this.maintenanceRepository.find({
        relations: ['project', 'staff'],
        order: {
          time: 'ASC',
        },
      })
    } else if (status == 'sap-toi') {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return this.maintenanceRepository.find({
        relations: ['project', 'staff'],
        where: {
          time: MoreThanOrEqual(today.toISOString().slice(0, 10)),
        },
        order: {
          time: 'ASC',
        },
      })
    } else if (status == 'dang-bao-tri') {
      return this.maintenanceRepository.find({
        relations: ['project', 'staff'],
        where: {
          status: false,
          staff: Not(IsNull()),
        },
        order: {
          time: 'ASC',
        },
      })
    }
  }

  findAllWProject(idProject: number) {
    return this.maintenanceRepository.find({
      relations: ['project', 'staff'],
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

  update (id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    return `This action updates a #${id} maintenance`
  }

  remove (id: number) {
    return `This action removes a #${id} maintenance`
  }
}
