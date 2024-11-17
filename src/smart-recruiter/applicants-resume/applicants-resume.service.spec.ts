import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantsResumeService } from './applicants-resume.service';

describe('ApplicantsResumeService', () => {
  let service: ApplicantsResumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicantsResumeService],
    }).compile();

    service = module.get<ApplicantsResumeService>(ApplicantsResumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
