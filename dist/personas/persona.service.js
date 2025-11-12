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
exports.PersonaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persona_entity_1 = require("./entities/persona.entity");
const grupoFamiliar_entity_1 = require("./entities/grupoFamiliar.entity");
const direccionPersona_entity_1 = require("./entities/direccionPersona.entity");
const situacionTerapeutica_entity_1 = require("./entities/situacionTerapeutica.entity");
let PersonaService = class PersonaService {
    personaRepo;
    grupoRepo;
    direccionRepository;
    situacionRepo;
    dataSource;
    constructor(personaRepo, grupoRepo, direccionRepository, situacionRepo, dataSource) {
        this.personaRepo = personaRepo;
        this.grupoRepo = grupoRepo;
        this.direccionRepository = direccionRepository;
        this.situacionRepo = situacionRepo;
        this.dataSource = dataSource;
    }
    findAll() {
        return this.findAllAfiliados();
    }
    findOne(id) {
        return this.findAfiliadoById(id);
    }
    create(dto) {
        return this.createAfiliado(dto);
    }
    async update(id, dto) {
        await this.personaRepo.update(id, dto);
        const updated = await this.personaRepo.findOne({ where: { id } });
        if (!updated)
            throw new common_1.NotFoundException(`Persona ${id} no encontrada`);
        return updated;
    }
    async remove(id) {
        const persona = await this.personaRepo.findOne({ where: { id } });
        if (!persona)
            throw new common_1.NotFoundException(`No se encontró la persona con ID ${id}`);
        if (persona.tipoPersona === 'AFILIADO') {
            const personasRelacionadas = await this.personaRepo.find({
                where: { credencial: persona.credencial },
            });
            const ids = personasRelacionadas.map((p) => p.id);
            if (ids.length > 0) {
                await this.personaRepo.delete(ids);
            }
            await this.grupoRepo.delete({ credencial: persona.credencial });
        }
        else {
            await this.personaRepo.delete(id);
        }
    }
    async addIntegrante(afiliadoId, integranteDto) {
        const afiliado = await this.findAfiliadoById(afiliadoId);
        const sufijos = afiliado.grupoFamiliar.personas
            .map(p => parseInt(p.sufijo, 10))
            .filter(n => !isNaN(n));
        const nextSufijo = sufijos.length === 0
            ? '02'
            : (Math.max(...sufijos) + 1).toString().padStart(2, '0');
        if (parseInt(nextSufijo, 10) > 99) {
            throw new Error('No se pueden agregar más integrantes a este grupo familiar (límite 99).');
        }
        const integrante = this.personaRepo.create({
            ...integranteDto,
            tipoPersona: 'INTEGRANTE',
            credencial: afiliado.credencial,
            sufijo: nextSufijo,
            grupoFamiliar: afiliado.grupoFamiliar,
            planMedico: afiliado.planMedico,
            fechaAlta: new Date().toISOString().split('T')[0],
        });
        return this.personaRepo.save(integrante);
    }
    async findAllAfiliados() {
        return this.personaRepo.find({ where: { tipoPersona: 'AFILIADO' } });
    }
    async findAfiliadoById(id) {
        const persona = await this.personaRepo.findOne({
            where: { id, tipoPersona: 'AFILIADO' },
            relations: ['grupoFamiliar'],
        });
        if (!persona)
            throw new common_1.NotFoundException(`Afiliado ${id} no encontrado`);
        return persona;
    }
    async createAfiliado(dto) {
        let nextCredencial = dto.credencial;
        if (!nextCredencial) {
            const lastGrupo = await this.grupoRepo
                .createQueryBuilder('g')
                .orderBy('g.credencial', 'DESC')
                .getOne();
            nextCredencial = lastGrupo
                ? (parseInt(lastGrupo.credencial, 10) + 1).toString().padStart(6, '0')
                : '000001';
        }
        let grupo = await this.grupoRepo.findOne({ where: { credencial: nextCredencial } });
        if (!grupo) {
            grupo = this.grupoRepo.create({
                credencial: nextCredencial,
                planMedico: dto.planMedico || '',
                fechaAlta: dto.fechaAlta || new Date().toISOString().split('T')[0],
                personas: [],
            });
            await this.grupoRepo.save(grupo);
        }
        const afiliado = this.personaRepo.create({
            ...dto,
            tipoPersona: 'AFILIADO',
            credencial: nextCredencial,
            sufijo: '01',
            grupoFamiliar: grupo,
            fechaAlta: dto.fechaAlta || new Date().toISOString().split('T')[0],
        });
        return this.personaRepo.save(afiliado);
    }
    async getAfiliadoConGrupo(credencial) {
        const personas = await this.personaRepo.find({ where: { credencial } });
        const titular = personas.find((p) => p.tipoPersona === 'AFILIADO');
        if (!titular)
            throw new common_1.NotFoundException(`Afiliado con credencial ${credencial} no encontrado`);
        const integrantes = personas.filter((p) => p.tipoPersona === 'INTEGRANTE');
        return {
            ...titular,
            grupoFamiliar: integrantes,
        };
    }
    async addDireccion(personaId, dto) {
        const persona = await this.personaRepo.findOne({
            where: { id: personaId },
            relations: ['direccion'],
        });
        if (!persona)
            throw new common_1.NotFoundException('Persona no encontrada');
        const nuevaDireccion = this.direccionRepository.create({ ...dto, persona });
        await this.direccionRepository.save(nuevaDireccion);
        return this.personaRepo.findOne({
            where: { id: personaId },
            relations: ['direccion'],
        });
    }
    async updateDireccion(personaId, direccionId, dto) {
        const direccion = await this.direccionRepository.findOne({
            where: { id: direccionId, personaId },
        });
        if (!direccion)
            throw new common_1.NotFoundException('Dirección no encontrada');
        Object.assign(direccion, dto);
        return this.direccionRepository.save(direccion);
    }
    async removeDireccion(personaId, direccionId) {
        const direccion = await this.direccionRepository.findOne({
            where: { id: direccionId, personaId },
        });
        if (!direccion)
            throw new common_1.NotFoundException('Dirección no encontrada');
        await this.direccionRepository.remove(direccion);
        return { message: 'Dirección eliminada correctamente' };
    }
    async addSituacionTerapeutica(personaId, dto) {
        const persona = await this.personaRepo.findOne({
            where: { id: personaId },
        });
        if (!persona)
            throw new common_1.NotFoundException('Persona no encontrada');
        const nueva = this.situacionRepo.create({ ...dto, persona });
        return await this.situacionRepo.save(nueva);
    }
    async updateSituacionTerapeutica(personaId, situacionId, dto) {
        const situacion = await this.situacionRepo.findOne({
            where: { id: situacionId, persona: { id: personaId } },
        });
        if (!situacion)
            throw new common_1.NotFoundException('Situación terapéutica no encontrada');
        Object.assign(situacion, dto);
        return await this.situacionRepo.save(situacion);
    }
    async removeSituacionTerapeutica(personaId, situacionId) {
        const situacion = await this.situacionRepo.findOne({
            where: { id: situacionId, persona: { id: personaId } },
        });
        if (!situacion)
            throw new common_1.NotFoundException('Situación terapéutica no encontrada');
        await this.situacionRepo.remove(situacion);
        return { message: 'Situación terapéutica eliminada correctamente' };
    }
};
exports.PersonaService = PersonaService;
exports.PersonaService = PersonaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __param(1, (0, typeorm_1.InjectRepository)(grupoFamiliar_entity_1.GrupoFamiliar)),
    __param(2, (0, typeorm_1.InjectRepository)(direccionPersona_entity_1.DireccionPersona)),
    __param(3, (0, typeorm_1.InjectRepository)(situacionTerapeutica_entity_1.SituacionTerapeutica)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PersonaService);
//# sourceMappingURL=persona.service.js.map