import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CollegesService } from './colleges.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Colleges')
@Controller('colleges')
export class CollegesController {
  constructor(private collegesService: CollegesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all colleges' })
  async findAll(
    @Query('search') search?: string,
    @Query('districtId') districtId?: string,
    @Query('type') type?: string,
  ) {
    return this.collegesService.findAll({ search, districtId, type });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get college by ID' })
  async findOne(@Param('id') id: string) {
    return this.collegesService.findOne(id);
  }

  @Get(':id/fees')
  @ApiOperation({ summary: 'Get college fee records' })
  async getFees(@Param('id') id: string, @Query('year') year?: string) {
    return this.collegesService.getFees(id, year);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get college by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.collegesService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create college (admin)' })
  async create(@Body() data: any) {
    return this.collegesService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update college (admin)' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.collegesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete college (admin)' })
  async delete(@Param('id') id: string) {
    return this.collegesService.delete(id);
  }
}