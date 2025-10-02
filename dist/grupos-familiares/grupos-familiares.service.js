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
exports.GruposFamiliaresService = void 0;
const common_1 = require("@nestjs/common");
const grupos_familiares_json_1 = __importDefault(require("../data/grupos-familiares.json"));
let GruposFamiliaresService = class GruposFamiliaresService {
    gruposFamiliares = grupos_familiares_json_1.default;
    findAll() {
        return this.gruposFamiliares;
    }
    findOne(id) {
        return this.gruposFamiliares.find((g) => g.id === id);
    }
    findByTitular(titularId) {
        return this.gruposFamiliares.find((g) => g.titularId === titularId);
    }
};
exports.GruposFamiliaresService = GruposFamiliaresService;
exports.GruposFamiliaresService = GruposFamiliaresService = __decorate([
    (0, common_1.Injectable)()
], GruposFamiliaresService);
//# sourceMappingURL=grupos-familiares.service.js.map