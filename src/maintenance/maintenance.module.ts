import { Module, forwardRef } from '@nestjs/common'
import { MaintenanceService } from './maintenance.service'
import { MaintenanceController } from './maintenance.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Maintenance } from './entities/maintenance.entity'
import { ProjectModule } from 'src/project/project.module'
import { StaffsModule } from 'src/staffs/staffs.module'
@Module({
  imports: [
    TypeOrmModule.forFeature([Maintenance]),
    forwardRef(() => ProjectModule),
    StaffsModule
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
