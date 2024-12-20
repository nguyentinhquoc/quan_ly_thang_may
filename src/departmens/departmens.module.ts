import { Module } from '@nestjs/common';
import { DepartmensService } from './departmens.service';
import { DepartmensController } from './departmens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/departmen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmensController],
  providers: [DepartmensService],
  exports:[DepartmensService]
})
export class DepartmensModule {}
