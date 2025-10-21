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
exports.DireccionPrestador = void 0;
const typeorm_1 = require("typeorm");
const prestador_entity_1 = require("./prestador.entity");
const horarioAtencion_entity_1 = require("./horarioAtencion.entity");
let DireccionPrestador = class DireccionPrestador {
    id;
    calle;
    numero;
    localidad;
    codigoPostal;
    prestador;
    horariosAtencion;
};
exports.DireccionPrestador = DireccionPrestador;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DireccionPrestador.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPrestador.prototype, "calle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPrestador.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPrestador.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DireccionPrestador.prototype, "codigoPostal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prestador_entity_1.Prestador, (p) => p.direccion, { onDelete: 'CASCADE' }),
    __metadata("design:type", prestador_entity_1.Prestador)
], DireccionPrestador.prototype, "prestador", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => horarioAtencion_entity_1.HorarioAtencion, (h) => h.direccion, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], DireccionPrestador.prototype, "horariosAtencion", void 0);
exports.DireccionPrestador = DireccionPrestador = __decorate([
    (0, typeorm_1.Entity)('direcciones')
], DireccionPrestador);
//# sourceMappingURL=direccionPrestador.entity.js.map