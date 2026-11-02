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
exports.CounsellingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const counselling_service_1 = require("./counselling.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let CounsellingController = class CounsellingController {
    constructor(counsellingService) {
        this.counsellingService = counsellingService;
    }
    async createRequest(data) {
        return this.counsellingService.createRequest(data);
    }
    async getRequests(status, counsellorId) {
        return this.counsellingService.getRequests({ status, counsellorId });
    }
    async getRequest(id) {
        return this.counsellingService.getRequestById(id);
    }
    async getByReference(reference) {
        return this.counsellingService.getRequestByReference(reference);
    }
    async assign(id, data, user) {
        return this.counsellingService.assignCounsellor(id, data.counsellorId, user.id);
    }
    async createAppointment(data) {
        return this.counsellingService.createAppointment(data);
    }
    async addNote(id, data, user) {
        return this.counsellingService.addNote(id, user.id, data.note, data.visibility);
    }
    async updateStatus(id, data) {
        return this.counsellingService.updateStatus(id, data.status);
    }
};
exports.CounsellingController = CounsellingController;
__decorate([
    (0, common_1.Post)('requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Create counselling request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get counselling requests (admin)' }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('counsellorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "getRequests", null);
__decorate([
    (0, common_1.Get)('requests/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get counselling request by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "getRequest", null);
__decorate([
    (0, common_1.Get)('requests/reference/:reference'),
    (0, swagger_1.ApiOperation)({ summary: 'Get counselling request by reference' }),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "getByReference", null);
__decorate([
    (0, common_1.Post)('requests/:id/assign'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Assign counsellor (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "assign", null);
__decorate([
    (0, common_1.Post)('appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create appointment (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Post)('requests/:id/notes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add note (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "addNote", null);
__decorate([
    (0, common_1.Put)('requests/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update request status (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CounsellingController.prototype, "updateStatus", null);
exports.CounsellingController = CounsellingController = __decorate([
    (0, swagger_1.ApiTags)('Counselling'),
    (0, common_1.Controller)('counselling'),
    __metadata("design:paramtypes", [counselling_service_1.CounsellingService])
], CounsellingController);
//# sourceMappingURL=counselling.controller.js.map