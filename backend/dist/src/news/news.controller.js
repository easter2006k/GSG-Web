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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const news_service_1 = require("./news.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async getNews() {
        return this.newsService.findAllPublished();
    }
    async getNewsOne(id) {
        return this.newsService.findOne(id);
    }
    async getNewsBySlug(slug) {
        return this.newsService.findBySlug(slug);
    }
    async createNews(data, user) {
        return this.newsService.create(data, user.id);
    }
    async updateNews(id, data) {
        return this.newsService.update(id, data);
    }
    async getTestimonials() {
        return this.newsService.getTestimonials();
    }
    async createTestimonial(data) {
        return this.newsService.createTestimonial(data);
    }
    async getFaqs() {
        return this.newsService.getFaqs();
    }
    async createFaq(data) {
        return this.newsService.createFaq(data);
    }
    async getImpactMetrics() {
        return this.newsService.getImpactMetrics();
    }
    async getDistricts() {
        return this.newsService.getDistricts();
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Get)('news'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all published news' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNews", null);
__decorate([
    (0, common_1.Get)('news/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get news by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNewsOne", null);
__decorate([
    (0, common_1.Get)('news/slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get news by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNewsBySlug", null);
__decorate([
    (0, common_1.Post)('news'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create news (admin)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "createNews", null);
__decorate([
    (0, common_1.Put)('news/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update news (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "updateNews", null);
__decorate([
    (0, common_1.Get)('testimonials'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published testimonials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getTestimonials", null);
__decorate([
    (0, common_1.Post)('testimonials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create testimonial (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "createTestimonial", null);
__decorate([
    (0, common_1.Get)('faqs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published FAQs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getFaqs", null);
__decorate([
    (0, common_1.Post)('faqs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create FAQ (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "createFaq", null);
__decorate([
    (0, common_1.Get)('impact-metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published impact metrics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getImpactMetrics", null);
__decorate([
    (0, common_1.Get)('districts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all districts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getDistricts", null);
exports.NewsController = NewsController = __decorate([
    (0, swagger_1.ApiTags)('Content'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map