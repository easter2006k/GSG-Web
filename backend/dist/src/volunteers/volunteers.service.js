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
exports.VolunteersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VolunteersService = class VolunteersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async apply(data) {
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
    async findAll(filters) {
        const where = filters?.status ? { status: filters.status } : {};
        return this.prisma.volunteerApplication.findMany({
            where,
            include: { district: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const app = await this.prisma.volunteerApplication.findUnique({
            where: { id },
            include: { district: true },
        });
        if (!app)
            throw new common_1.NotFoundException('Volunteer application not found');
        return app;
    }
    async updateStatus(id, status) {
        return this.prisma.volunteerApplication.update({
            where: { id },
            data: { status: status },
        });
    }
};
exports.VolunteersService = VolunteersService;
exports.VolunteersService = VolunteersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VolunteersService);
//# sourceMappingURL=volunteers.service.js.map