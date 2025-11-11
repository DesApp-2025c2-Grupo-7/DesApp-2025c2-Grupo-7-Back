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
exports.GrupoFamiliar = void 0;
const typeorm_1 = require("typeorm");
const persona_entity_1 = require("./persona.entity");
let GrupoFamiliar = class GrupoFamiliar {
    id;
    credencial;
    planMedico;
    estado;
    fechaAlta;
    fechaBaja;
    personas;
};
exports.GrupoFamiliar = GrupoFamiliar;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GrupoFamiliar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "credencial", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "planMedico", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Activo' }),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], GrupoFamiliar.prototype, "fechaAlta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], GrupoFamiliar.prototype, "fechaBaja", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => persona_entity_1.Persona, (persona) => persona.grupoFamiliar, { eager: true }),
    __metadata("design:type", Array)
], GrupoFamiliar.prototype, "personas", void 0);
exports.GrupoFamiliar = GrupoFamiliar = __decorate([
    (0, typeorm_1.Entity)('grupos_familiares')
], GrupoFamiliar);
//# sourceMappingURL=grupoFamiliar.entity.js.map