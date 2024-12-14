import { Module } from '@nestjs/common';
import { ApplicationScrutinyService } from './application-scrutiny.service';
import { ApplicationScrutinyController } from './application-scrutiny.controller';

@Module({
  providers: [ApplicationScrutinyService],
  controllers: [ApplicationScrutinyController]
})
export class ApplicationScrutinyModule {}
