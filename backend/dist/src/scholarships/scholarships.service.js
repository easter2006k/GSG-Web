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
exports.ScholarshipsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let ScholarshipsService = class ScholarshipsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPublished() {
        return this.prisma.scholarship.findMany({
            where: { isPublished: true },
            include: { district: true },
            orderBy: { deadlineAt: 'asc' },
        });
    }
    async findOne(id) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id },
            include: { district: true },
        });
        if (!scholarship)
            throw new common_1.NotFoundException('Scholarship not found');
        return scholarship;
    }
    async findBySlug(slug) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { slug },
            include: { district: true },
        });
        if (!scholarship)
            throw new common_1.NotFoundException('Scholarship not found');
        return scholarship;
    }
    async apply(scholarshipId, data) {
        const scholarship = await this.findOne(scholarshipId);
        if (!scholarship.isPublished) {
            throw new common_1.BadRequestException('Scholarship is not accepting applications');
        }
        if (scholarship.deadlineAt && new Date() > scholarship.deadlineAt) {
            throw new common_1.BadRequestException('Application deadline has passed');
        }
        const existing = await this.prisma.scholarshipApplication.findFirst({
            where: { scholarshipId, contactPhone: data.contactPhone },
        });
        if (existing) {
            throw new common_1.BadRequestException('You have already applied for this scholarship');
        }
        const reference = `SCH-${(0, uuid_1.v4)().substring(0, 8).toUpperCase()}`;
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
    async getApplications(scholarshipId) {
        const where = scholarshipId ? { scholarshipId } : {};
        return this.prisma.scholarshipApplication.findMany({
            where,
            include: { scholarship: true },
            orderBy: { submittedAt: 'desc' },
        });
    }
    async getApplicationByReference(reference) {
        const app = await this.prisma.scholarshipApplication.findUnique({
            where: { applicationReference: reference },
            include: {
                scholarship: true,
                statusHistory: { orderBy: { createdAt: 'desc' } }
            },
        });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        return app;
    }
    async updateApplicationStatus(id, status, comment, userId) {
        const app = await this.prisma.scholarshipApplication.findUnique({ where: { id } });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        await this.prisma.applicationStatusHistory.create({
            data: {
                scholarshipApplicationId: id,
                previousStatus: app.status,
                newStatus: status,
                changedBy: userId,
                reason: comment,
            },
        });
        return this.prisma.scholarshipApplication.update({
            where: { id },
            data: {
                status: status,
                reviewerComment: comment,
                decidedAt: status === 'APPROVED' || status === 'REJECTED' ? new Date() : undefined,
            },
        });
    }
    async create(data) {
        return this.prisma.scholarship.create({ data });
    }
    async update(id, data) {
        return this.prisma.scholarship.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prisma.scholarship.delete({ where: { id } });
    }
};
exports.ScholarshipsService = ScholarshipsService;
exports.ScholarshipsService = ScholarshipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScholarshipsService);
//# sourceMappingURL=scholarships.service.js.map