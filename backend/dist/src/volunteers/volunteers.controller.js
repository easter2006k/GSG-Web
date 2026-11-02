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
exports.VolunteersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const volunteers_service_1 = require("./volunteers.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let VolunteersController = class VolunteersController {
    constructor(volunteersService) {
        this.volunteersService = volunteersService;
    }
    async apply(data) {
        return this.volunteersService.apply(data);
    }
    async findAll(status) {
        return this.volunteersService.findAll({ status });
    }
    async findOne(id) {
        return this.volunteersService.findOne(id);
    }
    async updateStatus(id, data) {
        return this.volunteersService.updateStatus(id, data.status);
    }
};
exports.VolunteersController = VolunteersController;
__decorate([
    (0, common_1.Post)('apply'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit volunteer application' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VolunteersController.prototype, "apply", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get volunteer applications (admin)' }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VolunteersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('applications/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get volunteer application by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VolunteersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('applications/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update application status (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VolunteersController.prototype, "updateStatus", null);
exports.VolunteersController = VolunteersController = __decorate([
    (0, swagger_1.ApiTags)('Volunteers'),
    (0, common_1.Controller)('volunteers'),
    __metadata("design:paramtypes", [volunteers_service_1.VolunteersService])
], VolunteersController);
//# sourceMappingURL=volunteers.controller.js.map