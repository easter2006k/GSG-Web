import { Module } from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { CollegesController } from './colleges.controller';

@Module({
  providers: [CollegesService],
  controllers: [CollegesController],
  exports: [CollegesService],
})
export class CollegesModule {}