"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const especialidades_entity_1 = require("./especialidades/entities/especialidades.entity");
const prestador_entity_1 = require("./prestadores/entities/prestador.entity");
const direccionPrestador_entity_1 = require("./prestadores/entities/direccionPrestador.entity");
const horarioAtencion_entity_1 = require("./prestadores/entities/horarioAtencion.entity");
const persona_entity_1 = require("./personas/entities/persona.entity");
const situacionTerapeutica_entity_1 = require("./personas/entities/situacionTerapeutica.entity");
const direccionPersona_entity_1 = require("./personas/entities/direccionPersona.entity");
const grupoFamiliar_entity_1 = require("./personas/entities/grupoFamiliar.entity");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'desapp_db',
    entities: [
        especialidades_entity_1.Especialidad,
        prestador_entity_1.Prestador,
        direccionPrestador_entity_1.DireccionPrestador,
        horarioAtencion_entity_1.HorarioAtencion,
        persona_entity_1.Persona,
        situacionTerapeutica_entity_1.SituacionTerapeutica,
        direccionPersona_entity_1.DireccionPersona,
        grupoFamiliar_entity_1.GrupoFamiliar,
    ],
    synchronize: true,
});
//# sourceMappingURL=data-source.js.map