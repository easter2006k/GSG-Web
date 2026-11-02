import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ScholarshipsService } from './scholarships.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Scholarships')
@Controller('scholarships')
export class ScholarshipsController {
  constructor(private scholarshipsService: ScholarshipsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published scholarships' })
  async findAll() {
    return this.scholarshipsService.findAllPublished();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get scholarship by ID' })
  async findOne(@Param('id') id: string) {
    return this.scholarshipsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get scholarship by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.scholarshipsService.findBySlug(slug);
  }

  @Post(':id/apply')
  @ApiOperation({ summary: 'Apply for a scholarship' })
  async apply(@Param('id') id: string, @Body() data: any) {
    return this.scholarshipsService.apply(id, data);
  }

  @Get('applications/my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user applications' })
  async getMyApplications(@CurrentUser() user: any) {
    return this.scholarshipsService.getApplications();
  }

  @Get('applications/all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all applications (admin)' })
  async getApplications(@Query('scholarshipId') scholarshipId?: string) {
    return this.scholarshipsService.getApplications(scholarshipId);
  }

  @Put('applications/:id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status (admin)' })
  async updateStatus(
    @Param('id') id: string,
    @Body() data: { status: string; comment?: string },
    @CurrentUser() user: any,
  ) {
    return this.scholarshipsService.updateApplicationStatus(id, data.status, data.comment, user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create scholarship (admin)' })
  async create(@Body() data: any) {
    return this.scholarshipsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update scholarship (admin)' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.scholarshipsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete scholarship (admin)' })
  async delete(@Param('id') id: string) {
    return this.scholarshipsService.delete(id);
  }
}