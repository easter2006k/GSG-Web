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
exports.ProgrammesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let ProgrammesService = class ProgrammesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllpublished() {
        return this.prisma.programme.findMany({
            where: { isPublished: true },
            include: { district: true },
            orderBy: { startsAt: 'asc' },
        });
    }
    async findOne(id) {
        const programme = await this.prisma.programme.findUnique({
            where: { id },
            include: { district: true, registrations: true },
        });
        if (!programme)
            throw new common_1.NotFoundException('Programme not found');
        return programme;
    }
    async findBySlug(slug) {
        const programme = await this.prisma.programme.findUnique({
            where: { slug },
            include: { district: true },
        });
        if (!programme)
            throw new common_1.NotFoundException('Programme not found');
        return programme;
    }
    async register(programmeId, data) {
        const programme = await this.findOne(programmeId);
        const now = new Date();
        if (programme.registrationOpensAt && now < programme.registrationOpensAt) {
            throw new common_1.BadRequestException('Registration has not opened yet');
        }
        if (programme.registrationClosesAt && now > programme.registrationClosesAt) {
            throw new common_1.BadRequestException('Registration has closed');
        }
        if (programme.status !== 'PUBLISHED') {
            throw new common_1.BadRequestException('Programme is not available for registration');
        }
        if (programme.capacity) {
            const registrationCount = await this.prisma.programmeRegistration.count({
                where: { programmeId, status: { in: ['REGISTERED', 'CONFIRMED', 'ATTENDED'] } },
            });
            if (registrationCount >= programme.capacity) {
                throw new common_1.BadRequestException('Programme is full');
            }
        }
        const existing = await this.prisma.programmeRegistration.findFirst({
            where: { programmeId, contactPhone: data.contactPhone },
        });
        if (existing) {
            throw new common_1.BadRequestException('You have already registered for this programme');
        }
        const reference = `PRG-${(0, uuid_1.v4)().substring(0, 8).toUpperCase()}`;
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
    async getRegistrations(programmeId) {
        return this.prisma.programmeRegistration.findMany({
            where: { programmeId },
            orderBy: { submittedAt: 'desc' },
        });
    }
    async create(data) {
        return this.prisma.programme.create({ data });
    }
    async update(id, data) {
        return this.prisma.programme.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prisma.programme.delete({ where: { id } });
    }
};
exports.ProgrammesService = ProgrammesService;
exports.ProgrammesService = ProgrammesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgrammesService);
//# sourceMappingURL=programmes.service.js.map