import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VolunteersService {
  constructor(private prisma: PrismaService) {}

  async apply(data: any) {
    return this.prisma.volunteerApplication.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        city: data.city,
        skills: data.skills || [],
        interests: data.interests || [],
        availability: data.availability,
        experience: data.experience,
        message: data.message,
        status: 'NEW',
      },
    });
  }

  async findAll(filters?: { status?: string }) {
    const where = filters?.status ? { status: filters.status as any } : {};
    return this.prisma.volunteerApplication.findMany({
      where,
      include: { district: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const app = await this.prisma.volunteerApplication.findUnique({
      where: { id },
      include: { district: true },
    });
    if (!app) throw new NotFoundException('Volunteer application not found');
    return app;
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.volunteerApplication.update({
      where: { id },
      data: { status: status as any },
    });
  }
}