import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Content')
@Controller()
export class NewsController {
  constructor(private newsService: NewsService) {}

  // News
  @Get('news')
  @ApiOperation({ summary: 'Get all published news' })
  async getNews() {
    return this.newsService.findAllPublished();
  }

  @Get('news/:id')
  @ApiOperation({ summary: 'Get news by ID' })
  async getNewsOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Get('news/slug/:slug')
  @ApiOperation({ summary: 'Get news by slug' })
  async getNewsBySlug(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  @Post('news')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create news (admin)' })
  async createNews(@Body() data: any, @CurrentUser() user: any) {
    return this.newsService.create(data, user.id);
  }

  @Put('news/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update news (admin)' })
  async updateNews(@Param('id') id: string, @Body() data: any) {
    return this.newsService.update(id, data);
  }

  // Testimonials
  @Get('testimonials')
  @ApiOperation({ summary: 'Get published testimonials' })
  async getTestimonials() {
    return this.newsService.getTestimonials();
  }

  @Post('testimonials')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create testimonial (admin)' })
  async createTestimonial(@Body() data: any) {
    return this.newsService.createTestimonial(data);
  }

  // FAQs
  @Get('faqs')
  @ApiOperation({ summary: 'Get published FAQs' })
  async getFaqs() {
    return this.newsService.getFaqs();
  }

  @Post('faqs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create FAQ (admin)' })
  async createFaq(@Body() data: any) {
    return this.newsService.createFaq(data);
  }

  // Impact Metrics
  @Get('impact-metrics')
  @ApiOperation({ summary: 'Get published impact metrics' })
  async getImpactMetrics() {
    return this.newsService.getImpactMetrics();
  }

  // Districts
  @Get('districts')
  @ApiOperation({ summary: 'Get all districts' })
  async getDistricts() {
    return this.newsService.getDistricts();
  }
}