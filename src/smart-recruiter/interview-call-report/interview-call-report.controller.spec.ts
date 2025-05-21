import { Test, TestingModule } from '@nestjs/testing';
import { InterviewCallReportController } from './interview-call-report.controller';

describe('InterviewCallReportController', () => {
  let controller: InterviewCallReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewCallReportController],
    }).compile();

    controller = module.get<InterviewCallReportController>(InterviewCallReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
