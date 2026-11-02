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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
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
        if (params.category) {
            where.category = params.category;
        }
        return this.prisma.course.findMany({
            where,
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                collegeCourses: {
                    include: { college: true }
                }
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async findBySlug(slug) {
        const course = await this.prisma.course.findUnique({
            where: { slug },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async create(data) {
        return this.prisma.course.create({ data });
    }
    async update(id, data) {
        return this.prisma.course.update({ where: { id }, data });
    }
    async delete(id) {
        return this.prisma.course.delete({ where: { id } });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map