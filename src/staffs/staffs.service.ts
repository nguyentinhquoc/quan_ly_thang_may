import { Injectable } from '@nestjs/common'
import { CreateStaffDto } from './dto/create-staff.dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { Staff } from './entities/staff.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/create-staff-logindto'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class StaffsService {
  constructor (
    @InjectRepository(Staff)
    private staffsRepository: Repository<Staff>,
    private jwtService: JwtService,
  ) {}
  async create (createStaffDto: CreateStaffDto): Promise<Staff> {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(
      createStaffDto.password,
      saltRounds,
    )
    const createStaffDtohash = this.staffsRepository.create({
      ...createStaffDto,
      password: hashedPassword,
    })
    return this.staffsRepository.save(createStaffDtohash)
  }
  findAll () {
    return this.staffsRepository.find()
  }
  findOne (id: number) {
    return this.staffsRepository.findOne({ where: { id } })
  }
  findOnew (email: string) {
    return this.staffsRepository.findOne({ where: { email } })
  }
  async login (loginDto: LoginDto) {
    const staff = await this.staffsRepository.findOne({
      where: { email: loginDto.email },
    })
    if (!staff) {
      return false
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      staff.password,
    )
    if (!isPasswordValid) {
      return false
    }
    const payload = {
      email: staff.email,
      id: staff.id,
      role_admin: staff.role_admin,
      full_name: staff.full_name,
      avatar: staff.avatar,
    }
    const token = this.createToken(payload)
    return token
  }
  async createToken (payload: any) {
    const token = this.jwtService.sign(payload)
    return token
  }
  async payload (token: string) {
    const payload = await this.jwtService.verify(token)
    return payload
  }
  async update (id: number, updateStaffDto: UpdateStaffDto) {
    if (updateStaffDto.password) {
      const saltRounds = 10
      updateStaffDto.password = await bcrypt.hash(
        updateStaffDto.password,
        saltRounds,
      )
    }
    await this.staffsRepository.update(id, updateStaffDto)
  }
  remove (id: number) {
    return this.staffsRepository.softDelete(id)
  }
}
