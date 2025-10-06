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
exports.Integrante = void 0;
const typeorm_1 = require("typeorm");
const afiliado_entity_1 = require("./afiliado.entity");
let Integrante = class Integrante {
    id;
    credencial;
    sufijo;
    tipoDocumento;
    numeroDocumento;
    nombre;
    apellido;
    fechaNacimiento;
    telefono;
    email;
    direccion;
    parentesco;
    situacionesTerapeuticas;
    planMedico;
    fechaAlta;
    fechaBaja;
    afiliado;
    afiliadoId;
};
exports.Integrante = Integrante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Integrante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Integrante.prototype, "credencial", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Integrante.prototype, "sufijo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integrante.prototype, "tipoDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integrante.prototype, "numeroDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integrante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integrante.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Integrante.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Integrante.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Integrante.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Integrante.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integrante.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Integrante.prototype, "situacionesTerapeuticas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integrante.prototype, "planMedico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Integrante.prototype, "fechaAlta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Integrante.prototype, "fechaBaja", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => afiliado_entity_1.Afiliado, (a) => a.grupoFamiliar, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'afiliadoId' }),
    __metadata("design:type", afiliado_entity_1.Afiliado)
], Integrante.prototype, "afiliado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Integrante.prototype, "afiliadoId", void 0);
exports.Integrante = Integrante = __decorate([
    (0, typeorm_1.Entity)('integrantes')
], Integrante);
//# sourceMappingURL=integrante.entity.js.map