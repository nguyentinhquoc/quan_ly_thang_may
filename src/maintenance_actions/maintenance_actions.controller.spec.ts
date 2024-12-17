import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceActionsController } from './maintenance_actions.controller';
import { MaintenanceActionsService } from './maintenance_actions.service';

describe('MaintenanceActionsController', () => {
  let controller: MaintenanceActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceActionsController],
      providers: [MaintenanceActionsService],
    }).compile();

    controller = module.get<MaintenanceActionsController>(MaintenanceActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
