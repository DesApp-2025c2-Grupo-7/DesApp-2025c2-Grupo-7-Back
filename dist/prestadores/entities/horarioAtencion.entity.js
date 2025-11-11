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
exports.HorarioAtencion = void 0;
const typeorm_1 = require("typeorm");
const direccionPrestador_entity_1 = require("./direccionPrestador.entity");
const especialidades_entity_1 = require("../../especialidades/entities/especialidades.entity");
let HorarioAtencion = class HorarioAtencion {
    id;
    dia;
    desde;
    hasta;
    duracionTurno;
    direccion;
    especialidad;
};
exports.HorarioAtencion = HorarioAtencion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HorarioAtencion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HorarioAtencion.prototype, "dia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HorarioAtencion.prototype, "desde", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HorarioAtencion.prototype, "hasta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HorarioAtencion.prototype, "duracionTurno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => direccionPrestador_entity_1.DireccionPrestador, (d) => d.horariosAtencion, { onDelete: 'CASCADE' }),
    __metadata("design:type", direccionPrestador_entity_1.DireccionPrestador)
], HorarioAtencion.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidades_entity_1.Especialidad, { eager: true, nullable: true }),
    __metadata("design:type", especialidades_entity_1.Especialidad)
], HorarioAtencion.prototype, "especialidad", void 0);
exports.HorarioAtencion = HorarioAtencion = __decorate([
    (0, typeorm_1.Entity)('horarios_atencion')
], HorarioAtencion);
//# sourceMappingURL=horarioAtencion.entity.js.map