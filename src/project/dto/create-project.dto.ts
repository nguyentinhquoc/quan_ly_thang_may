import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsString,
  MaxLength,
  IsArray,
  IsDateString,
} from 'class-validator'

export class CreateProjectDto {
  workflow: number

  @IsNotEmpty()
  @MaxLength(255)
  full_name: string

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  number_phone: string

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  infor_product?: any

  @MaxLength(225)
  description: string

  @IsNotEmpty()
  steps: string

  @IsDateString({}, { each: true })
  timeMaintenance?: string[]

  @IsOptional()
  @IsString()
  dongCo?: string

  @IsOptional()
  @IsString()
  tuDien?: string

  @IsOptional()
  @IsString()
  capTai?: string

  @IsOptional()
  @IsString()
  congSuat?: string

  @IsOptional()
  @IsString()
  hoThang?: string

  @IsOptional()
  @IsString()
  cabin?: string

  @IsOptional()
  @IsString()
  cua?: string

  @IsOptional()
  @IsString()
  pit?: string

  @IsOptional()
  @IsString()
  oh?: string

  @IsOptional()
  @IsString()
  baoHanh?: string

  @IsOptional()
  @IsString()
  baoTri?: string
}
