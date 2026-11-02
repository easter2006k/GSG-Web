import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScholarshipsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublished() {
    return this.prisma.scholarship.findMany({
      where: { isPublished: true },
      include: { district: true },
      orderBy: { deadlineAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id },
      include: { district: true },
    });
    if (!scholarship) throw new NotFoundException('Scholarship not found');
    return scholarship;
  }

  async findBySlug(slug: string) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { slug },
      include: { district: true },
    });
    if (!scholarship) throw new NotFoundException('Scholarship not found');
    return scholarship;
  }

  async apply(scholarshipId: string, data: any) {
    const scholarship = await this.findOne(scholarshipId);

    if (!scholarship.isPublished) {
      throw new BadRequestException('Scholarship is not accepting applications');
    }

    if (scholarship.deadlineAt && new Date() > scholarship.deadlineAt) {
      throw new BadRequestException('Application deadline has passed');
    }

    // Check for duplicate (same phone + scholarship)
    const existing = await this.prisma.scholarshipApplication.findFirst({
      where: { scholarshipId, contactPhone: data.contactPhone },
    });
    if (existing) {
      throw new BadRequestException('You have already applied for this scholarship');
    }

    const reference = `SCH-${uuidv4().substring(0, 8).toUpperCase()}`;

    return this.prisma.scholarshipApplication.create({
      data: {
        scholarshipId,
        applicantName: data.applicantName,
        contactPhone: data.contactPhone,
        email: data.email,
        educationDetails: data.educationDetails || {},
        eligibilityData: data.eligibilityData || {},
        applicationReference: reference,
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });
  }

  async getApplications(scholarshipId?: string) {
    const where = scholarshipId ? { scholarshipId } : {};
    return this.prisma.scholarshipApplication.findMany({
      where,
      include: { scholarship: true },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async getApplicationByReference(reference: string) {
    const app = await this.prisma.scholarshipApplication.findUnique({
      where: { applicationReference: reference },
      include: {
        scholarship: true,
        statusHistory: { orderBy: { createdAt: 'desc' } }
      },
    });
    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async updateApplicationStatus(id: string, status: string, comment?: string, userId?: string) {
    const app = await this.prisma.scholarshipApplication.findUnique({ where: { id } });
    if (!app) throw new NotFoundException('Application not found');

    // Create status history
    await this.prisma.applicationStatusHistory.create({
      data: {
        scholarshipApplicationId: id,
        previousStatus: app.status as any,
        newStatus: status as any,
        changedBy: userId,
        reason: comment,
      },
    });

    return this.prisma.scholarshipApplication.update({
      where: { id },
      data: {
        status: status as any,
        reviewerComment: comment,
        decidedAt: status === 'APPROVED' || status === 'REJECTED' ? new Date() : undefined,
      },
    });
  }

  async create(data: any) {
    return this.prisma.scholarship.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.scholarship.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.scholarship.delete({ where: { id } });
  }
}