import { Test, TestingModule } from '@nestjs/testing';
import { SelectedResumeController } from './selected-resume.controller';

describe('SelectedResumeController', () => {
  let controller: SelectedResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedResumeController],
    }).compile();

    controller = module.get<SelectedResumeController>(SelectedResumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
