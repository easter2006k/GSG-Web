import { Module } from '@nestjs/common';
import { CounsellingService } from './counselling.service';
import { CounsellingController } from './counselling.controller';

@Module({
  providers: [CounsellingService],
  controllers: [CounsellingController],
  exports: [CounsellingService],
})
export class CounsellingModule {}