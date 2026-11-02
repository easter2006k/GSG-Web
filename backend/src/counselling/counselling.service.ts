import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CounsellingService {
  constructor(private prisma: PrismaService) {}

  async createRequest(data: any) {
    const reference = `CNS-${uuidv4().substring(0, 8).toUpperCase()}`;

    return this.prisma.counsellingRequest.create({
      data: {
        requestReference: reference,
        studentName: data.studentName,
        contactPhone: data.contactPhone,
        schoolOrCollege: data.schoolOrCollege,
        qualification: data.qualification,
        topic: data.topic,
        description: data.description,
        preferredContactMethod: data.preferredContactMethod,
        preferredFormat: data.preferredFormat,
        status: 'NEW',
      },
    });
  }

  async getRequests(filters?: { status?: string; counsellorId?: string }) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.counsellorId) {
      where.assignments = { some: { counsellorUserId: filters.counsellorId } };
    }

    return this.prisma.counsellingRequest.findMany({
      where,
      include: {
        district: true,
        assignments: { include: { counsellor: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRequestById(id: string) {
    const request = await this.prisma.counsellingRequest.findUnique({
      where: { id },
      include: {
        district: true,
        assignments: { include: { counsellor: true } },
        appointments: true,
        notes: { include: { author: true } },
      },
    });
    if (!request) throw new NotFoundException('Counselling request not found');
    return request;
  }

  async getRequestByReference(reference: string) {
    const request = await this.prisma.counsellingRequest.findUnique({
      where: { requestReference: reference },
      include: {
        assignments: { include: { counsellor: true } },
        appointments: true,
      },
    });
    if (!request) throw new NotFoundException('Counselling request not found');
    return request;
  }

  async assignCounsellor(requestId: string, counsellorId: string, assignedBy?: string) {
    const request = await this.getRequestById(requestId);

    return this.prisma.counsellingAssignment.create({
      data: {
        counsellingRequestId: requestId,
        counsellorUserId: counsellorId,
        assignedBy,
      },
    });
  }

  async createAppointment(data: any) {
    // Check for conflicts
    const conflict = await this.prisma.counsellingAppointment.findFirst({
      where: {
        counsellorUserId: data.counsellorUserId,
        status: { in: ['PROPOSED', 'CONFIRMED'] },
        OR: [
          {
            startsAt: { lte: new Date(data.startsAt) },
            endsAt: { gt: new Date(data.startsAt) },
          },
          {
            startsAt: { lt: new Date(data.endsAt) },
            endsAt: { gte: new Date(data.endsAt) },
          },
        ],
      },
    });

    if (conflict) {
      throw new BadRequestException('Counsellor has a conflicting appointment');
    }

    return this.prisma.counsellingAppointment.create({
      data: {
        counsellingRequestId: data.counsellingRequestId,
        counsellorUserId: data.counsellorUserId,
        startsAt: new Date(data.startsAt),
        endsAt: new Date(data.endsAt),
        format: data.format,
        locationOrMeetingDetails: data.locationOrMeetingDetails,
        status: 'PROPOSED',
      },
    });
  }

  async addNote(requestId: string, authorId: string, note: string, visibility: string = 'INTERNAL') {
    return this.prisma.counsellingNote.create({
      data: {
        counsellingRequestId: requestId,
        authorUserId: authorId,
        note,
        visibility,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.counsellingRequest.update({
      where: { id },
      data: { status: status as any },
    });
  }
}