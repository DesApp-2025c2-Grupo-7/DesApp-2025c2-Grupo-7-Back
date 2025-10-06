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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfiliadosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const afiliado_entity_1 = require("./entities/afiliado.entity");
const integrante_entity_1 = require("./entities/integrante.entity");
let AfiliadosService = class AfiliadosService {
    afiliadoRepo;
    integranteRepo;
    constructor(afiliadoRepo, integranteRepo) {
        this.afiliadoRepo = afiliadoRepo;
        this.integranteRepo = integranteRepo;
    }
    findAll() {
        return this.afiliadoRepo.find();
    }
    async findOne(id) {
        const a = await this.afiliadoRepo.findOne({ where: { id } });
        if (!a)
            throw new common_1.NotFoundException(`Afiliado ${id} no encontrado`);
        return a;
    }
    create(dto) {
        const ent = this.afiliadoRepo.create(dto);
        return this.afiliadoRepo.save(ent);
    }
    async update(id, dto) {
        await this.afiliadoRepo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.afiliadoRepo.delete(id);
    }
    async addIntegrante(afiliadoId, integranteDto) {
        const afiliado = await this.findOne(afiliadoId);
        const integrante = this.integranteRepo.create({ ...integranteDto, afiliado });
        return this.integranteRepo.save(integrante);
    }
};
exports.AfiliadosService = AfiliadosService;
exports.AfiliadosService = AfiliadosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(afiliado_entity_1.Afiliado)),
    __param(1, (0, typeorm_1.InjectRepository)(integrante_entity_1.Integrante)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AfiliadosService);
//# sourceMappingURL=afiliados.service.js.map