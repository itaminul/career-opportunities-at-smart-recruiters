import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationScrutinyService } from './application-scrutiny.service';

describe('ApplicationScrutinyService', () => {
  let service: ApplicationScrutinyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationScrutinyService],
    }).compile();

    service = module.get<ApplicationScrutinyService>(ApplicationScrutinyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
