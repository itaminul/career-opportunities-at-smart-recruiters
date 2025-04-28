import { Test, TestingModule } from '@nestjs/testing';
import { InterviewCallReportService } from './interview-call-report.service';

describe('InterviewCallReportService', () => {
  let service: InterviewCallReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewCallReportService],
    }).compile();

    service = module.get<InterviewCallReportService>(InterviewCallReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
