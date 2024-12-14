import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStepDto {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsString()
  description: string
}
