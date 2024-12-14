import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsString,
  MaxLength,
  IsArray,
} from 'class-validator';

export class CreateProjectDto {
  workflow: number;

  @IsNotEmpty()
  @MaxLength(255)
  full_name: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  number_phone: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  infor_product?: any; // Hoặc kiểu dữ liệu phù hợp

  @MaxLength(225)
  description: string;

  @IsNotEmpty()  // Có thể cần kiểm tra tính hợp lệ của "steps"
  steps: string;

  @IsOptional()
  @IsString()
  dongCo?: string;

  @IsOptional()
  @IsString()
  tuDien?: string;

  @IsOptional()
  @IsString()
  capTai?: string;

  @IsOptional()
  @IsString()
  congSuat?: string;

  @IsOptional()
  @IsString()
  hoThang?: string;

  @IsOptional()
  @IsString()
  cabin?: string;

  @IsOptional()
  @IsString()
  cua?: string;

  @IsOptional()
  @IsString()
  pit?: string;

  @IsOptional()
  @IsString()
  oh?: string;

  @IsOptional()
  @IsString()
  baoHanh?: string;

  @IsOptional()
  @IsString()
  baoTri?: string;
}
