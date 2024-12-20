import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmenDto } from './create-departmen.dto';

export class UpdateDepartmenDto extends PartialType(CreateDepartmenDto) {}
