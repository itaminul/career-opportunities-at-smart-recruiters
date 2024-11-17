import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantsResumeController } from './applicants-resume.controller';

describe('ApplicantsResumeController', () => {
  let controller: ApplicantsResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantsResumeController],
    }).compile();

    controller = module.get<ApplicantsResumeController>(ApplicantsResumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
