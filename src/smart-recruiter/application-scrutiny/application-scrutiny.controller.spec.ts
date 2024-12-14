import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationScrutinyController } from './application-scrutiny.controller';

describe('ApplicationScrutinyController', () => {
  let controller: ApplicationScrutinyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationScrutinyController],
    }).compile();

    controller = module.get<ApplicationScrutinyController>(ApplicationScrutinyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
