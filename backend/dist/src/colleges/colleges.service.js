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
exports.CollegesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CollegesService = class CollegesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const where = { isPublished: true };
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
    async findOne(id) {
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
        if (!college)
            throw new common_1.NotFoundException('College not found');
        return college;
    }
    async findBySlug(slug) {
        const college = await this.prisma.college.findUnique({
            where: { slug },
            include: {
                district: true,
                collegeCourses: {
                    include: { course: true }
                }
            },
        });
        if (!college)
            throw new common_1.NotFoundException('College not found');
        return college;
    }
    async getFees(collegeId, academicYear) {
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
        if (!college)
            throw new common_1.NotFoundException('College not found');
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
    async getCourses(params) {
        const where = { isPublished: true };
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
    async create(data) {
        return this.prisma.college.create({ data });
    }
    async update(id, data) {
        return this.prisma.college.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prisma.college.delete({ where: { id } });
    }
};
exports.CollegesService = CollegesService;
exports.CollegesService = CollegesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CollegesService);
//# sourceMappingURL=colleges.service.js.map