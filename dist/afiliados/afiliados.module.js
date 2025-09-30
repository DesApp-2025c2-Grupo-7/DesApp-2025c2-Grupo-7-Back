"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfiliadosModule = void 0;
const common_1 = require("@nestjs/common");
const afiliados_service_1 = require("./afiliados.service");
const afiliados_controller_1 = require("./afiliados.controller");
let AfiliadosModule = class AfiliadosModule {
};
exports.AfiliadosModule = AfiliadosModule;
exports.AfiliadosModule = AfiliadosModule = __decorate([
    (0, common_1.Module)({
        controllers: [afiliados_controller_1.AfiliadosController],
        providers: [afiliados_service_1.AfiliadosService],
        exports: [afiliados_service_1.AfiliadosService],
    })
], AfiliadosModule);
//# sourceMappingURL=afiliados.module.js.map