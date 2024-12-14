import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString
} from 'class-validator'
import { Department } from 'src/departmens/entities/departmen.entity'
import { Position } from 'src/positions/entities/position.entity'
export class CreateStaffDto {

  @IsString()
  @IsNotEmpty()
  full_name: string

  @IsNotEmpty()
  department: Department

  @IsNotEmpty()
  position: Position

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  number_phone: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  avatar: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  @IsNotEmpty()
  password: string
}
