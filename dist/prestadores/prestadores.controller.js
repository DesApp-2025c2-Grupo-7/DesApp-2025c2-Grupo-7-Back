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
exports.PrestadoresController = void 0;
const common_1 = require("@nestjs/common");
const prestadores_service_1 = require("./prestadores.service");
const direccionPrestador_entity_1 = require("./entities/direccionPrestador.entity");
let PrestadoresController = class PrestadoresController {
    service;
    constructor(service) {
        this.service = service;
    }
    getDirecciones(prestadorId) {
        return this.service.getDirecciones(Number(prestadorId));
    }
    addDireccion(prestadorId, dto) {
        return this.service.addDireccion(prestadorId, dto);
    }
    updateDireccion(prestadorId, direccionId, dto) {
        return this.service.updateDireccion(prestadorId, direccionId, dto);
    }
    deleteDireccion(prestadorId, direccionId) {
        return this.service.deleteDireccion(Number(prestadorId), Number(direccionId));
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(Number(id));
    }
    create(body) {
        const especialidadIds = Array.isArray(body.especialidadIds)
            ? body.especialidadIds
            : [];
        return this.service.create(body, especialidadIds);
    }
    update(id, body) {
        return this.service.update(Number(id), body, body.especialidadIds || []);
    }
    remove(id) {
        return this.service.remove(Number(id));
    }
    getHorarios(direccionId) {
        return this.service.getHorarios(Number(direccionId));
    }
    addHorario(direccionId, dto) {
        return this.service.addHorario(Number(direccionId), dto);
    }
    updateHorario(direccionId, horarioId, dto) {
        return this.service.updateHorario(Number(direccionId), Number(horarioId), dto);
    }
    deleteHorario(direccionId, horarioId) {
        return this.service.deleteHorario(Number(direccionId), Number(horarioId));
    }
};
exports.PrestadoresController = PrestadoresController;
__decorate([
    (0, common_1.Get)(':id/direcciones'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "getDirecciones", null);
__decorate([
    (0, common_1.Post)(':id/direcciones'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, direccionPrestador_entity_1.DireccionPrestador]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "addDireccion", null);
__decorate([
    (0, common_1.Put)(':id/direcciones/:direccionId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('direccionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "updateDireccion", null);
__decorate([
    (0, common_1.Delete)(':id/direcciones/:direccionId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('direccionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "deleteDireccion", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/direcciones/:direccionId/horarios'),
    __param(0, (0, common_1.Param)('direccionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "getHorarios", null);
__decorate([
    (0, common_1.Post)(':id/direcciones/:direccionId/horarios'),
    __param(0, (0, common_1.Param)('direccionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "addHorario", null);
__decorate([
    (0, common_1.Put)(':id/direcciones/:direccionId/horarios/:horarioId'),
    __param(0, (0, common_1.Param)('direccionId')),
    __param(1, (0, common_1.Param)('horarioId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "updateHorario", null);
__decorate([
    (0, common_1.Delete)(':id/direcciones/:direccionId/horarios/:horarioId'),
    __param(0, (0, common_1.Param)('direccionId')),
    __param(1, (0, common_1.Param)('horarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PrestadoresController.prototype, "deleteHorario", null);
exports.PrestadoresController = PrestadoresController = __decorate([
    (0, common_1.Controller)('prestadores'),
    __metadata("design:paramtypes", [prestadores_service_1.PrestadoresService])
], PrestadoresController);
//# sourceMappingURL=prestadores.controller.js.map