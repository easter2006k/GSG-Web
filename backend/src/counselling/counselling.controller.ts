import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CounsellingService } from './counselling.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Counselling')
@Controller('counselling')
export class CounsellingController {
  constructor(private counsellingService: CounsellingService) {}

  @Post('requests')
  @ApiOperation({ summary: 'Create counselling request' })
  async createRequest(@Body() data: any) {
    return this.counsellingService.createRequest(data);
  }

  @Get('requests')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get counselling requests (admin)' })
  async getRequests(
    @Query('status') status?: string,
    @Query('counsellorId') counsellorId?: string,
  ) {
    return this.counsellingService.getRequests({ status, counsellorId });
  }

  @Get('requests/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get counselling request by ID' })
  async getRequest(@Param('id') id: string) {
    return this.counsellingService.getRequestById(id);
  }

  @Get('requests/reference/:reference')
  @ApiOperation({ summary: 'Get counselling request by reference' })
  async getByReference(@Param('reference') reference: string) {
    return this.counsellingService.getRequestByReference(reference);
  }

  @Post('requests/:id/assign')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign counsellor (admin)' })
  async assign(
    @Param('id') id: string,
    @Body() data: { counsellorId: string },
    @CurrentUser() user: any,
  ) {
    return this.counsellingService.assignCounsellor(id, data.counsellorId, user.id);
  }

  @Post('appointments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create appointment (admin)' })
  async createAppointment(@Body() data: any) {
    return this.counsellingService.createAppointment(data);
  }

  @Post('requests/:id/notes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add note (admin)' })
  async addNote(
    @Param('id') id: string,
    @Body() data: { note: string; visibility?: string },
    @CurrentUser() user: any,
  ) {
    return this.counsellingService.addNote(id, user.id, data.note, data.visibility);
  }

  @Put('requests/:id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update request status (admin)' })
  async updateStatus(@Param('id') id: string, @Body() data: { status: string }) {
    return this.counsellingService.updateStatus(id, data.status);
  }
}