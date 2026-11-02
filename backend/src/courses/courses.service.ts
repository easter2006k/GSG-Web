import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { search?: string; category?: string }) {
    const where: any = { isPublished: true };

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.category) {
      where.category = params.category;
    }

    return this.prisma.course.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        collegeCourses: {
          include: { college: true }
        }
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async findBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async create(data: any) {
    return this.prisma.course.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.course.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}