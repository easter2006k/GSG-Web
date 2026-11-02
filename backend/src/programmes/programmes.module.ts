import { Module } from '@nestjs/common';
import { ProgrammesService } from './programmes.service';
import { ProgrammesController } from './programmes.controller';

@Module({
  providers: [ProgrammesService],
  controllers: [ProgrammesController],
  exports: [ProgrammesService],
})
export class ProgrammesModule {}