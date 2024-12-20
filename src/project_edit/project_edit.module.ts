import { forwardRef, Module } from '@nestjs/common'
import { ProjectEditService } from './project_edit.service'
import { ProjectEditController } from './project_edit.controller'
import { StaffsModule } from 'src/staffs/staffs.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectEdit } from './entities/project_edit.entity'
import { ProjectModule } from 'src/project/project.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEdit]),
    StaffsModule,
    forwardRef(() => ProjectModule),
  ],
  controllers: [ProjectEditController],
  providers: [ProjectEditService],
  exports: [ProjectEditService],
})
export class ProjectEditModule {}
