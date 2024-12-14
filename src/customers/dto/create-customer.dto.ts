import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator'
export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  full_name: string
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  number_phone: string
  @IsEmail()
  email: string
  @IsString()
  address: string
}
