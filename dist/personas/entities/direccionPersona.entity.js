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
exports.DireccionPersona = void 0;
const typeorm_1 = require("typeorm");
const persona_entity_1 = require("./persona.entity");
let DireccionPersona = class DireccionPersona {
    id;
    calle;
    numero;
    localidad;
    codigoPostal;
    persona;
    personaId;
};
exports.DireccionPersona = DireccionPersona;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DireccionPersona.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPersona.prototype, "calle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPersona.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPersona.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPersona.prototype, "codigoPostal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => persona_entity_1.Persona, (persona) => persona.direccion, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'personaId' }),
    __metadata("design:type", persona_entity_1.Persona)
], DireccionPersona.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DireccionPersona.prototype, "personaId", void 0);
exports.DireccionPersona = DireccionPersona = __decorate([
    (0, typeorm_1.Entity)('direcciones-personas')
], DireccionPersona);
//# sourceMappingURL=direccionPersona.entity.js.map