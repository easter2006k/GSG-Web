import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VolunteersService } from './volunteers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Volunteers')
@Controller('volunteers')
export class VolunteersController {
  constructor(private volunteersService: VolunteersService) {}

  @Post('apply')
  @ApiOperation({ summary: 'Submit volunteer application' })
  async apply(@Body() data: any) {
    return this.volunteersService.apply(data);
  }

  @Get('applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get volunteer applications (admin)' })
  async findAll(@Query('status') status?: string) {
    return this.volunteersService.findAll({ status });
  }

  @Get('applications/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get volunteer application by ID' })
  async findOne(@Param('id') id: string) {
    return this.volunteersService.findOne(id);
  }

  @Put('applications/:id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status (admin)' })
  async updateStatus(@Param('id') id: string, @Body() data: { status: string }) {
    return this.volunteersService.updateStatus(id, data.status);
  }
}