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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./team.service");
const client_1 = require("@prisma/client");
let TeamController = class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    async getAllPublished(department) {
        return this.teamService.getAllPublished(department);
    }
    async getAllAdmin(department, status) {
        return this.teamService.getAllAdmin(department, status);
    }
    async getOne(idOrSlug) {
        return this.teamService.getOne(idOrSlug);
    }
    async create(body) {
        return this.teamService.create(body);
    }
    async update(id, body) {
        return this.teamService.update(id, body);
    }
    async updateStatus(id, status) {
        return this.teamService.updateStatus(id, status);
    }
    async delete(id) {
        return this.teamService.delete(id);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('department')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getAllPublished", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    __param(0, (0, common_1.Query)('department')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getAllAdmin", null);
__decorate([
    (0, common_1.Get)(':idOrSlug'),
    __param(0, (0, common_1.Param)('idOrSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('admin/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('admin/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)('admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "delete", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.Controller)('team-members'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamController);
//# sourceMappingURL=team.controller.js.map