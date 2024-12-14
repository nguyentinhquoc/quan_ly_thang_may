import { Injectable } from '@nestjs/common'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Position } from './entities/position.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PositionsService {
  constructor (
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>
  ) {}
  create (createPositionDto: CreatePositionDto): Promise<Position> {
    return this.positionsRepository.save(createPositionDto)
  }
async  findAll () {
    return await this.positionsRepository.find()
  }
  findOne(id: number) {
    return this.positionsRepository.findOne({ where: { id } })
  }
  update(id: number,updatePositionDto: UpdatePositionDto) {
    return this.positionsRepository.update(id, updatePositionDto);
  }

  remove (id: number) {
    return this.positionsRepository.softDelete(id);
  }
}
