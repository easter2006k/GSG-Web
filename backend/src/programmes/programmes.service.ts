import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProgrammesService {
  constructor(private prisma: PrismaService) {}

  async findAllpublished() {
    return this.prisma.programme.findMany({
      where: { isPublished: true },
      include: { district: true },
      orderBy: { startsAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const programme = await this.prisma.programme.findUnique({
      where: { id },
      include: { district: true, registrations: true },
    });
    if (!programme) throw new NotFoundException('Programme not found');
    return programme;
  }

  async findBySlug(slug: string) {
    const programme = await this.prisma.programme.findUnique({
      where: { slug },
      include: { district: true },
    });
    if (!programme) throw new NotFoundException('Programme not found');
    return programme;
  }

  async register(programmeId: string, data: any) {
    const programme = await this.findOne(programmeId);

    // Check if registration is open
    const now = new Date();
    if (programme.registrationOpensAt && now < programme.registrationOpensAt) {
      throw new BadRequestException('Registration has not opened yet');
    }
    if (programme.registrationClosesAt && now > programme.registrationClosesAt) {
      throw new BadRequestException('Registration has closed');
    }
    if (programme.status !== 'PUBLISHED') {
      throw new BadRequestException('Programme is not available for registration');
    }

    // Check capacity
    if (programme.capacity) {
      const registrationCount = await this.prisma.programmeRegistration.count({
        where: { programmeId, status: { in: ['REGISTERED', 'CONFIRMED', 'ATTENDED'] } },
      });
      if (registrationCount >= programme.capacity) {
        throw new BadRequestException('Programme is full');
      }
    }

    // Check for duplicate (same phone + programme)
    const existing = await this.prisma.programmeRegistration.findFirst({
      where: { programmeId, contactPhone: data.contactPhone },
    });
    if (existing) {
      throw new BadRequestException('You have already registered for this programme');
    }

    const reference = `PRG-${uuidv4().substring(0, 8).toUpperCase()}`;

    return this.prisma.programmeRegistration.create({
      data: {
        programmeId,
        studentName: data.studentName,
        schoolNameSnapshot: data.schoolName,
        standardAndGroup: data.standardAndGroup,
        contactPhone: data.contactPhone,
        referralSource: data.referralSource,
        referralOther: data.referralOther,
        registrationReference: reference,
        status: 'REGISTERED',
      },
    });
  }

  async getRegistrations(programmeId: string) {
    return this.prisma.programmeRegistration.findMany({
      where: { programmeId },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async create(data: any) {
    return this.prisma.programme.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.programme.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.programme.delete({ where: { id } });
  }
}