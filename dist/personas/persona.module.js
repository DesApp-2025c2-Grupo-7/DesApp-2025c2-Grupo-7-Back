"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const persona_service_1 = require("./persona.service");
const persona_controller_1 = require("./persona.controller");
const persona_entity_1 = require("./entities/persona.entity");
const grupoFamiliar_entity_1 = require("./entities/grupoFamiliar.entity");
const direccionPersona_entity_1 = require("./entities/direccionPersona.entity");
const situacionTerapeutica_entity_1 = require("./entities/situacionTerapeutica.entity");
let PersonasModule = class PersonasModule {
};
exports.PersonasModule = PersonasModule;
exports.PersonasModule = PersonasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([persona_entity_1.Persona, grupoFamiliar_entity_1.GrupoFamiliar, direccionPersona_entity_1.DireccionPersona, situacionTerapeutica_entity_1.SituacionTerapeutica])],
        providers: [persona_service_1.PersonaService],
        controllers: [persona_controller_1.PersonaController],
    })
], PersonasModule);
//# sourceMappingURL=persona.module.js.map