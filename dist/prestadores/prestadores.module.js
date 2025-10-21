"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestadoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prestador_entity_1 = require("./entities/prestador.entity");
const especialidades_entity_1 = require("../especialidades/entities/especialidades.entity");
const prestadores_service_1 = require("./prestadores.service");
const prestadores_controller_1 = require("./prestadores.controller");
const direccionPrestador_entity_1 = require("./entities/direccionPrestador.entity");
const horarioAtencion_entity_1 = require("./entities/horarioAtencion.entity");
let PrestadoresModule = class PrestadoresModule {
};
exports.PrestadoresModule = PrestadoresModule;
exports.PrestadoresModule = PrestadoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prestador_entity_1.Prestador, especialidades_entity_1.Especialidad, direccionPrestador_entity_1.DireccionPrestador, horarioAtencion_entity_1.HorarioAtencion])],
        providers: [prestadores_service_1.PrestadoresService],
        controllers: [prestadores_controller_1.PrestadoresController],
    })
], PrestadoresModule);
//# sourceMappingURL=prestadores.module.js.map