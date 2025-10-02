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
exports.AfiliadosController = void 0;
const common_1 = require("@nestjs/common");
const afiliados_service_1 = require("./afiliados.service");
let AfiliadosController = class AfiliadosController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(q, grupoFamiliar) {
        return this.service.findAll(q, grupoFamiliar);
    }
    findByGrupoFamiliar(grupoId) {
        return this.service.findByGrupoFamiliar(grupoId);
    }
    findTitularByGrupo(grupoId) {
        return this.service.findTitularByGrupo(grupoId);
    }
    findDependientesByTitular(titularId) {
        return this.service.findDependientesByTitular(Number(titularId));
    }
    findOne(id) {
        return this.service.findOne(Number(id));
    }
};
exports.AfiliadosController = AfiliadosController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('grupoFamiliar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Array)
], AfiliadosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('grupo/:grupoId'),
    __param(0, (0, common_1.Param)('grupoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], AfiliadosController.prototype, "findByGrupoFamiliar", null);
__decorate([
    (0, common_1.Get)('titular/:grupoId'),
    __param(0, (0, common_1.Param)('grupoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AfiliadosController.prototype, "findTitularByGrupo", null);
__decorate([
    (0, common_1.Get)('dependientes/:titularId'),
    __param(0, (0, common_1.Param)('titularId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], AfiliadosController.prototype, "findDependientesByTitular", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AfiliadosController.prototype, "findOne", null);
exports.AfiliadosController = AfiliadosController = __decorate([
    (0, common_1.Controller)('afiliados'),
    __metadata("design:paramtypes", [afiliados_service_1.AfiliadosService])
], AfiliadosController);
//# sourceMappingURL=afiliados.controller.js.map