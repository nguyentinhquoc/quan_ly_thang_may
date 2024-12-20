import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartmenDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsOptional()
  description?: string
}
