import { Test, TestingModule } from '@nestjs/testing';
import { ViteFrontendService } from './vite-frontend.service';

describe('ViteFrontendService', () => {
  let service: ViteFrontendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViteFrontendService],
    }).compile();

    service = module.get<ViteFrontendService>(ViteFrontendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
