import { Test, TestingModule } from '@nestjs/testing';
import { SelectedResumeService } from './selected-resume.service';

describe('SelectedResumeService', () => {
  let service: SelectedResumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedResumeService],
    }).compile();

    service = module.get<SelectedResumeService>(SelectedResumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
