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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NewsService = class NewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPublished() {
        return this.prisma.newsArticle.findMany({
            where: { status: 'PUBLISHED' },
            include: { author: true },
            orderBy: { publishedAt: 'desc' },
        });
    }
    async findOne(id) {
        const article = await this.prisma.newsArticle.findUnique({
            where: { id },
            include: { author: true },
        });
        if (!article)
            throw new common_1.NotFoundException('News article not found');
        return article;
    }
    async findBySlug(slug) {
        const article = await this.prisma.newsArticle.findUnique({
            where: { slug },
            include: { author: true },
        });
        if (!article)
            throw new common_1.NotFoundException('News article not found');
        return article;
    }
    async create(data, authorId) {
        return this.prisma.newsArticle.create({
            data: {
                ...data,
                authorId,
                publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
            },
        });
    }
    async update(id, data) {
        const updateData = { ...data };
        if (data.status === 'PUBLISHED') {
            updateData.publishedAt = new Date();
        }
        return this.prisma.newsArticle.update({ where: { id }, data: updateData });
    }
    async delete(id) {
        return this.prisma.newsArticle.delete({ where: { id } });
    }
    async getTestimonials() {
        return this.prisma.testimonial.findMany({
            where: { isPublished: true },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async createTestimonial(data) {
        return this.prisma.testimonial.create({ data });
    }
    async getFaqs() {
        return this.prisma.faq.findMany({
            where: { isPublished: true },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async createFaq(data) {
        return this.prisma.faq.create({ data });
    }
    async getImpactMetrics() {
        return this.prisma.impactMetric.findMany({
            where: { isPublished: true },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async getDistricts() {
        return this.prisma.district.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsService);
//# sourceMappingURL=news.service.js.map