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
exports.Prestador = void 0;
const typeorm_1 = require("typeorm");
const direccionPrestador_entity_1 = require("./direccionPrestador.entity");
const especialidades_entity_1 = require("../../especialidades/entities/especialidades.entity");
let Prestador = class Prestador {
    id;
    numeroCUIL;
    nombreCompleto;
    especialidades;
    esProfesionalIndependiente;
    telefono;
    email;
    direccion;
    profesionales;
    centrosMedicos;
};
exports.Prestador = Prestador;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Prestador.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 11 }),
    __metadata("design:type", String)
], Prestador.prototype, "numeroCUIL", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prestador.prototype, "nombreCompleto", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => especialidades_entity_1.Especialidad, { eager: true, cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Prestador.prototype, "especialidades", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Prestador.prototype, "esProfesionalIndependiente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Prestador.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Prestador.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => direccionPrestador_entity_1.DireccionPrestador, (direccion) => direccion.prestador, { cascade: true, eager: true, onDelete: 'CASCADE', }),
    __metadata("design:type", Array)
], Prestador.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Prestador, (prestador) => prestador.centrosMedicos),
    (0, typeorm_1.JoinTable)({
        name: 'centro_profesionales',
        joinColumn: { name: 'centro_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'profesional_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Prestador.prototype, "profesionales", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Prestador, (prestador) => prestador.profesionales),
    __metadata("design:type", Array)
], Prestador.prototype, "centrosMedicos", void 0);
exports.Prestador = Prestador = __decorate([
    (0, typeorm_1.Entity)('prestadores')
], Prestador);
//# sourceMappingURL=prestador.entity.js.map