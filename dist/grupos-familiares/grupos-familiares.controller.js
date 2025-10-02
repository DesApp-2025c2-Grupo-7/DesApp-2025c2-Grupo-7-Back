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
exports.GruposFamiliaresController = void 0;
const common_1 = require("@nestjs/common");
const grupos_familiares_service_1 = require("./grupos-familiares.service");
let GruposFamiliaresController = class GruposFamiliaresController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    findByTitular(titularId) {
        return this.service.findByTitular(Number(titularId));
    }
};
exports.GruposFamiliaresController = GruposFamiliaresController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], GruposFamiliaresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], GruposFamiliaresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('titular/:titularId'),
    __param(0, (0, common_1.Param)('titularId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], GruposFamiliaresController.prototype, "findByTitular", null);
exports.GruposFamiliaresController = GruposFamiliaresController = __decorate([
    (0, common_1.Controller)('grupos-familiares'),
    __metadata("design:paramtypes", [grupos_familiares_service_1.GruposFamiliaresService])
], GruposFamiliaresController);
//# sourceMappingURL=grupos-familiares.controller.js.map