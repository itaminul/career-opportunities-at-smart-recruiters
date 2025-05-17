import { Test, TestingModule } from '@nestjs/testing';
import { InterviewCallService } from './interview-call.service';

describe('InterviewCallService', () => {
  let service: InterviewCallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewCallService],
    }).compile();

    service = module.get<InterviewCallService>(InterviewCallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
