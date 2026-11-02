import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.coursesService.findAll({ search, category });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get course by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.coursesService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create course (admin)' })
  async create(@Body() data: any) {
    return this.coursesService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course (admin)' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.coursesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete course (admin)' })
  async delete(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}