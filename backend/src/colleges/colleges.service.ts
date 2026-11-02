import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollegesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { search?: string; districtId?: string; type?: string }) {
    const where: any = { isPublished: true };

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.districtId) {
      where.districtId = params.districtId;
    }
    if (params.type) {
      where.institutionType = params.type;
    }

    return this.prisma.college.findMany({
      where,
      include: {
        district: true,
        collegeCourses: {
          include: { course: true }
        }
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const college = await this.prisma.college.findUnique({
      where: { id },
      include: {
        district: true,
        collegeCourses: {
          include: {
            course: true,
            feeRecords: { orderBy: { academicYear: 'desc' } }
          }
        }
      },
    });
    if (!college) throw new NotFoundException('College not found');
    return college;
  }

  async findBySlug(slug: string) {
    const college = await this.prisma.college.findUnique({
      where: { slug },
      include: {
        district: true,
        collegeCourses: {
          include: { course: true }
        }
      },
    });
    if (!college) throw new NotFoundException('College not found');
    return college;
  }

  async getFees(collegeId: string, academicYear?: string) {
    const college = await this.prisma.college.findUnique({
      where: { id: collegeId },
      include: {
        collegeCourses: {
          include: {
            course: true,
            feeRecords: academicYear ? { where: { academicYear } } : { orderBy: { academicYear: 'desc' } }
          }
        }
      }
    });
    if (!college) throw new NotFoundException('College not found');
    return college.collegeCourses.map(cc => ({
      course: cc.course.name,
      academicYear: cc.feeRecords.map(fr => ({
        year: fr.academicYear,
        tuitionFee: fr.tuitionFee,
        otherFees: fr.otherFees,
        hostelFee: fr.hostelFee,
        verificationStatus: fr.verificationStatus,
        verifiedAt: fr.verifiedAt,
      }))
    }));
  }

  async getCourses(params: { search?: string; category?: string }) {
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
      include: {
        collegeCourses: {
          include: { college: true }
        }
      },
      orderBy: { name: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.college.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.college.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.college.delete({ where: { id } });
  }
}