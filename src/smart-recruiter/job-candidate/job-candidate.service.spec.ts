import { Test, TestingModule } from '@nestjs/testing';
import { JobCandidateService } from './job-candidate.service';

describe('JobCandidateService', () => {
  let service: JobCandidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobCandidateService],
    }).compile();

    service = module.get<JobCandidateService>(JobCandidateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
