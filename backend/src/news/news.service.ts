import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublished() {
    return this.prisma.newsArticle.findMany({
      where: { status: 'PUBLISHED' },
      include: { author: true },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.newsArticle.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!article) throw new NotFoundException('News article not found');
    return article;
  }

  async findBySlug(slug: string) {
    const article = await this.prisma.newsArticle.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (!article) throw new NotFoundException('News article not found');
    return article;
  }

  async create(data: any, authorId?: string) {
    return this.prisma.newsArticle.create({
      data: {
        ...data,
        authorId,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
    });
  }

  async update(id: string, data: any) {
    const updateData = { ...data };
    if (data.status === 'PUBLISHED') {
      updateData.publishedAt = new Date();
    }
    return this.prisma.newsArticle.update({ where: { id }, data: updateData });
  }

  async delete(id: string) {
    return this.prisma.newsArticle.delete({ where: { id } });
  }

  async getTestimonials() {
    return this.prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async createTestimonial(data: any) {
    return this.prisma.testimonial.create({ data });
  }

  async getFaqs() {
    return this.prisma.faq.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async createFaq(data: any) {
    return this.prisma.faq.create({ data });
  }

  async getImpactMetrics() {
    return this.prisma.impactMetric.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getDistricts() {
    return this.prisma.district.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}