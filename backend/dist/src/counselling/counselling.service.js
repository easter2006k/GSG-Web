"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounsellingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let CounsellingService = class CounsellingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRequest(data) {
        const reference = `CNS-${(0, uuid_1.v4)().substring(0, 8).toUpperCase()}`;
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
    async getRequests(filters) {
        const where = {};
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
    async getRequestById(id) {
        const request = await this.prisma.counsellingRequest.findUnique({
            where: { id },
            include: {
                district: true,
                assignments: { include: { counsellor: true } },
                appointments: true,
                notes: { include: { author: true } },
            },
        });
        if (!request)
            throw new common_1.NotFoundException('Counselling request not found');
        return request;
    }
    async getRequestByReference(reference) {
        const request = await this.prisma.counsellingRequest.findUnique({
            where: { requestReference: reference },
            include: {
                assignments: { include: { counsellor: true } },
                appointments: true,
            },
        });
        if (!request)
            throw new common_1.NotFoundException('Counselling request not found');
        return request;
    }
    async assignCounsellor(requestId, counsellorId, assignedBy) {
        const request = await this.getRequestById(requestId);
        return this.prisma.counsellingAssignment.create({
            data: {
                counsellingRequestId: requestId,
                counsellorUserId: counsellorId,
                assignedBy,
            },
        });
    }
    async createAppointment(data) {
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
            throw new common_1.BadRequestException('Counsellor has a conflicting appointment');
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
    async addNote(requestId, authorId, note, visibility = 'INTERNAL') {
        return this.prisma.counsellingNote.create({
            data: {
                counsellingRequestId: requestId,
                authorUserId: authorId,
                note,
                visibility,
            },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.counsellingRequest.update({
            where: { id },
            data: { status: status },
        });
    }
};
exports.CounsellingService = CounsellingService;
exports.CounsellingService = CounsellingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CounsellingService);
//# sourceMappingURL=counselling.service.js.map