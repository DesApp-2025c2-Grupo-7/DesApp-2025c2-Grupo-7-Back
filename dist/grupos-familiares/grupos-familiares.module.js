"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GruposFamiliaresModule = void 0;
const common_1 = require("@nestjs/common");
const grupos_familiares_controller_1 = require("./grupos-familiares.controller");
const grupos_familiares_service_1 = require("./grupos-familiares.service");
let GruposFamiliaresModule = class GruposFamiliaresModule {
};
exports.GruposFamiliaresModule = GruposFamiliaresModule;
exports.GruposFamiliaresModule = GruposFamiliaresModule = __decorate([
    (0, common_1.Module)({
        controllers: [grupos_familiares_controller_1.GruposFamiliaresController],
        providers: [grupos_familiares_service_1.GruposFamiliaresService],
        exports: [grupos_familiares_service_1.GruposFamiliaresService],
    })
], GruposFamiliaresModule);
//# sourceMappingURL=grupos-familiares.module.js.map