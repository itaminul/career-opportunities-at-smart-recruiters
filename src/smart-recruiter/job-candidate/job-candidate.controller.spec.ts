import { Test, TestingModule } from '@nestjs/testing';
import { JobCandidateController } from './job-candidate.controller';

describe('JobCandidateController', () => {
  let controller: JobCandidateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobCandidateController],
    }).compile();

    controller = module.get<JobCandidateController>(JobCandidateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
