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
exports.PersonaController = void 0;
const common_1 = require("@nestjs/common");
const persona_service_1 = require("./persona.service");
let PersonaController = class PersonaController {
    personaService;
    constructor(personaService) {
        this.personaService = personaService;
    }
    findAll() {
        return this.personaService.findAll();
    }
    findOne(id) {
        return this.personaService.findOne(id);
    }
    create(dto) {
        return this.personaService.create(dto);
    }
    update(id, dto) {
        return this.personaService.update(id, dto);
    }
    remove(id) {
        return this.personaService.remove(id);
    }
    addIntegrante(afiliadoId, integranteDto) {
        return this.personaService.addIntegrante(afiliadoId, integranteDto);
    }
    getAfiliadoConGrupo(credencial) {
        return this.personaService.getAfiliadoConGrupo(credencial);
    }
    addDireccion(id, direccionDto) {
        return this.personaService.addDireccion(id, direccionDto);
    }
    updateDireccion(id, direccionId, direccionDto) {
        return this.personaService.updateDireccion(id, direccionId, direccionDto);
    }
    removeDireccion(id, direccionId) {
        return this.personaService.removeDireccion(id, direccionId);
    }
    addSituacion(id, dto) {
        return this.personaService.addSituacionTerapeutica(id, dto);
    }
    updateSituacion(id, situacionId, dto) {
        return this.personaService.updateSituacionTerapeutica(id, situacionId, dto);
    }
    removeSituacion(id, situacionId) {
        return this.personaService.removeSituacionTerapeutica(id, situacionId);
    }
};
exports.PersonaController = PersonaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/integrantes'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "addIntegrante", null);
__decorate([
    (0, common_1.Get)('grupo/:credencial'),
    __param(0, (0, common_1.Param)('credencial')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "getAfiliadoConGrupo", null);
__decorate([
    (0, common_1.Post)(':id/direcciones'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PersonaController.prototype, "addDireccion", null);
__decorate([
    (0, common_1.Put)(':id/direcciones/:direccionId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('direccionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PersonaController.prototype, "updateDireccion", null);
__decorate([
    (0, common_1.Delete)(':id/direcciones/:direccionId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('direccionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PersonaController.prototype, "removeDireccion", null);
__decorate([
    (0, common_1.Post)(':id/situaciones-terapeuticas'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PersonaController.prototype, "addSituacion", null);
__decorate([
    (0, common_1.Put)(':id/situaciones-terapeuticas/:situacionId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('situacionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PersonaController.prototype, "updateSituacion", null);
__decorate([
    (0, common_1.Delete)(':id/situaciones-terapeuticas/:situacionId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('situacionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PersonaController.prototype, "removeSituacion", null);
exports.PersonaController = PersonaController = __decorate([
    (0, common_1.Controller)('personas'),
    __metadata("design:paramtypes", [persona_service_1.PersonaService])
], PersonaController);
//# sourceMappingURL=persona.controller.js.map