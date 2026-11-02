import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProgrammesService } from './programmes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Programmes')
@Controller('programmes')
export class ProgrammesController {
  constructor(private programmesService: ProgrammesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published programmes' })
  async findAll() {
    return this.programmesService.findAllpublished();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get programme by ID' })
  async findOne(@Param('id') id: string) {
    return this.programmesService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get programme by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.programmesService.findBySlug(slug);
  }

  @Post(':id/registrations')
  @ApiOperation({ summary: 'Register for a programme' })
  async register(@Param('id') id: string, @Body() data: any) {
    return this.programmesService.register(id, data);
  }

  @Get(':id/registrations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get programme registrations (admin)' })
  async getRegistrations(@Param('id') id: string) {
    return this.programmesService.getRegistrations(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create programme (admin)' })
  async create(@Body() data: any) {
    return this.programmesService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update programme (admin)' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.programmesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete programme (admin)' })
  async delete(@Param('id') id: string) {
    return this.programmesService.delete(id);
  }
}