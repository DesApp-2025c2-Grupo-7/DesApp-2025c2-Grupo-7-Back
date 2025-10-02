"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfiliadosService = void 0;
const common_1 = require("@nestjs/common");
const afiliados_json_1 = __importDefault(require("../data/afiliados.json"));
let AfiliadosService = class AfiliadosService {
    afiliados = afiliados_json_1.default;
    findAll(q, grupoFamiliar) {
        let result = this.afiliados;
        if (grupoFamiliar) {
            result = result.filter((a) => a.grupoFamiliar === grupoFamiliar);
        }
        if (q) {
            result = result.filter((a) => a.nombre.toLowerCase().includes(q.toLowerCase()) ||
                a.apellido.toLowerCase().includes(q.toLowerCase()) ||
                a.numeroDocumento.includes(q));
        }
        return result;
    }
    findOne(id) {
        return this.afiliados.find((a) => a.id === id);
    }
    findByGrupoFamiliar(grupoFamiliar) {
        return this.afiliados.filter((a) => a.grupoFamiliar === grupoFamiliar);
    }
    findTitularByGrupo(grupoFamiliar) {
        return this.afiliados.find((a) => a.grupoFamiliar === grupoFamiliar && a.titularId === null);
    }
    findDependientesByTitular(titularId) {
        return this.afiliados.filter((a) => a.titularId === titularId);
    }
};
exports.AfiliadosService = AfiliadosService;
exports.AfiliadosService = AfiliadosService = __decorate([
    (0, common_1.Injectable)()
], AfiliadosService);
//# sourceMappingURL=afiliados.service.js.map