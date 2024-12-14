import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionDto } from './create-position.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
}
