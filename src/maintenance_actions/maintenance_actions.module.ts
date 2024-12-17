import { Module } from '@nestjs/common';
import { MaintenanceActionsService } from './maintenance_actions.service';
import { MaintenanceActionsController } from './maintenance_actions.controller';

@Module({
  controllers: [MaintenanceActionsController],
  providers: [MaintenanceActionsService],
})
export class MaintenanceActionsModule {}
