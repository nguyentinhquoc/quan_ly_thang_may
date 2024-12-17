import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceActionsService } from './maintenance_actions.service';

describe('MaintenanceActionsService', () => {
  let service: MaintenanceActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceActionsService],
    }).compile();

    service = module.get<MaintenanceActionsService>(MaintenanceActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
