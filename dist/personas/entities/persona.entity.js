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
exports.Persona = void 0;
const typeorm_1 = require("typeorm");
const grupoFamiliar_entity_1 = require("./grupoFamiliar.entity");
const direccionPersona_entity_1 = require("./direccionPersona.entity");
const situacionTerapeutica_entity_1 = require("./situacionTerapeutica.entity");
let Persona = class Persona {
    id;
    credencial;
    sufijo;
    tipoPersona;
    tipoDocumento;
    numeroDocumento;
    nombre;
    apellido;
    fechaNacimiento;
    telefono;
    email;
    parentesco;
    direccion;
    situacionesTerapeuticas;
    grupoFamiliar;
    grupoFamiliarId;
    planMedico;
    fechaAlta;
    fechaBaja;
};
exports.Persona = Persona;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Persona.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Persona.prototype, "credencial", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2 }),
    __metadata("design:type", String)
], Persona.prototype, "sufijo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['AFILIADO', 'INTEGRANTE'] }),
    __metadata("design:type", String)
], Persona.prototype, "tipoPersona", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Persona.prototype, "tipoDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Persona.prototype, "numeroDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Persona.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Persona.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Persona.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Persona.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => direccionPersona_entity_1.DireccionPersona, (direccion) => direccion.persona, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Persona.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => situacionTerapeutica_entity_1.SituacionTerapeutica, (sit) => sit.persona, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Persona.prototype, "situacionesTerapeuticas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => grupoFamiliar_entity_1.GrupoFamiliar, (grupo) => grupo.personas),
    (0, typeorm_1.JoinColumn)({ name: 'grupoFamiliarId' }),
    __metadata("design:type", grupoFamiliar_entity_1.GrupoFamiliar)
], Persona.prototype, "grupoFamiliar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Persona.prototype, "grupoFamiliarId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "planMedico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Persona.prototype, "fechaAlta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Persona.prototype, "fechaBaja", void 0);
exports.Persona = Persona = __decorate([
    (0, typeorm_1.Entity)('personas'),
    (0, typeorm_1.Unique)(['credencial', 'sufijo'])
], Persona);
//# sourceMappingURL=persona.entity.js.map