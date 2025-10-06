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
exports.Afiliado = void 0;
const typeorm_1 = require("typeorm");
const integrante_entity_1 = require("./integrante.entity");
let Afiliado = class Afiliado {
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
    grupoFamiliar;
};
exports.Afiliado = Afiliado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Afiliado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Afiliado.prototype, "credencial", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Afiliado.prototype, "sufijo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliado.prototype, "tipoDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliado.prototype, "numeroDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliado.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Afiliado.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Afiliado.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Afiliado.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Afiliado.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliado.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Afiliado.prototype, "situacionesTerapeuticas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliado.prototype, "planMedico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Afiliado.prototype, "fechaAlta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Afiliado.prototype, "fechaBaja", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => integrante_entity_1.Integrante, (i) => i.afiliado, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Afiliado.prototype, "grupoFamiliar", void 0);
exports.Afiliado = Afiliado = __decorate([
    (0, typeorm_1.Entity)('afiliados')
], Afiliado);
//# sourceMappingURL=afiliado.entity.js.map