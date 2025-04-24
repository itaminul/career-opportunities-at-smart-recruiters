import { Test, TestingModule } from '@nestjs/testing';
import { InterviewCallController } from './interview-call.controller';

describe('InterviewCallController', () => {
  let controller: InterviewCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewCallController],
    }).compile();

    controller = module.get<InterviewCallController>(InterviewCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
