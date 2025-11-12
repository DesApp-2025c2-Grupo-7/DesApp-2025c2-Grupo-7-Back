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
exports.PrestadoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prestador_entity_1 = require("../prestadores/entities/prestador.entity");
const direccionPrestador_entity_1 = require("./entities/direccionPrestador.entity");
const especialidades_entity_1 = require("../especialidades/entities/especialidades.entity");
const horarioAtencion_entity_1 = require("./entities/horarioAtencion.entity");
let PrestadoresService = class PrestadoresService {
    prestadorRepo;
    especialidadRepo;
    direccionRepo;
    horarioRepo;
    constructor(prestadorRepo, especialidadRepo, direccionRepo, horarioRepo) {
        this.prestadorRepo = prestadorRepo;
        this.especialidadRepo = especialidadRepo;
        this.direccionRepo = direccionRepo;
        this.horarioRepo = horarioRepo;
    }
    findAll() {
        return this.prestadorRepo.find({ relations: ['especialidades'] });
    }
    async findOne(id) {
        const prestador = await this.prestadorRepo.findOne({
            where: { id },
            relations: ['especialidades'],
        });
        if (!prestador)
            throw new common_1.NotFoundException(`Prestador ${id} no encontrado`);
        return prestador;
    }
    async create(dto, especialidadIds) {
        const prestador = this.prestadorRepo.create(dto);
        if (especialidadIds.length > 0) {
            const especialidades = await this.especialidadRepo.findByIds(especialidadIds);
            prestador.especialidades = especialidades;
        }
        return this.prestadorRepo.save(prestador);
    }
    async update(id, dto, especialidadIds) {
        const prestador = await this.findOne(id);
        Object.assign(prestador, dto);
        if (especialidadIds.length > 0) {
            const especialidades = await this.especialidadRepo.findByIds(especialidadIds);
            prestador.especialidades = especialidades;
        }
        return this.prestadorRepo.save(prestador);
    }
    async remove(id) {
        await this.prestadorRepo.delete(id);
    }
    async getDirecciones(prestadorId) {
        const prestador = await this.prestadorRepo.findOne({
            where: { id: prestadorId },
            relations: ['direccion'],
        });
        if (!prestador)
            throw new common_1.NotFoundException('Prestador no encontrado');
        return prestador.direccion;
    }
    async addDireccion(prestadorId, dto) {
        const prestador = await this.prestadorRepo.findOne({ where: { id: prestadorId } });
        if (!prestador)
            throw new common_1.NotFoundException('Prestador no encontrado');
        const nuevaDireccion = this.direccionRepo.create({ ...dto, prestador });
        return this.direccionRepo.save(nuevaDireccion);
    }
    async updateDireccion(prestadorId, direccionId, dto) {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId, prestador: { id: prestadorId } },
            relations: ['prestador'],
        });
        if (!direccion)
            throw new common_1.NotFoundException('Dirección no encontrada o no pertenece al prestador');
        Object.assign(direccion, dto);
        return this.direccionRepo.save(direccion);
    }
    async deleteDireccion(prestadorId, direccionId) {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId, prestador: { id: prestadorId } },
        });
        if (!direccion)
            throw new common_1.NotFoundException('Dirección no encontrada o no pertenece al prestador');
        await this.direccionRepo.delete(direccionId);
    }
    async getHorarios(direccionId) {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId },
            relations: ['horariosAtencion', 'horariosAtencion.especialidad'],
        });
        if (!direccion)
            throw new common_1.NotFoundException('Dirección no encontrada');
        return direccion.horariosAtencion;
    }
    async addHorario(direccionId, dto) {
        const direccion = await this.direccionRepo.findOne({ where: { id: direccionId } });
        if (!direccion)
            throw new common_1.NotFoundException('Dirección no encontrada');
        let especialidad = undefined;
        if (dto.especialidadId) {
            const found = await this.especialidadRepo.findOne({ where: { id: dto.especialidadId } });
            if (!found)
                throw new common_1.NotFoundException('Especialidad no encontrada');
            especialidad = found;
        }
        const nuevoHorario = this.horarioRepo.create({
            ...dto,
            direccion,
            especialidad,
        });
        return await this.horarioRepo.save(nuevoHorario);
    }
    async updateHorario(direccionId, horarioId, dto) {
        const horario = await this.horarioRepo.findOne({
            where: { id: horarioId, direccion: { id: direccionId } },
            relations: ['direccion', 'especialidad'],
        });
        if (!horario)
            throw new common_1.NotFoundException('Horario no encontrado o no pertenece a la dirección');
        if (dto.especialidadId) {
            const especialidad = await this.especialidadRepo.findOne({ where: { id: dto.especialidadId } });
            if (!especialidad)
                throw new common_1.NotFoundException('Especialidad no encontrada');
            horario.especialidad = especialidad;
        }
        Object.assign(horario, dto);
        return this.horarioRepo.save(horario);
    }
    async deleteHorario(direccionId, horarioId) {
        const horario = await this.horarioRepo.findOne({
            where: { id: horarioId, direccion: { id: direccionId } },
        });
        if (!horario)
            throw new common_1.NotFoundException('Horario no encontrado o no pertenece a la dirección');
        await this.horarioRepo.delete(horarioId);
    }
    async getProfesionalesIndependientes(centroMedicoId) {
        const centroMedico = await this.prestadorRepo.findOne({
            where: { id: centroMedicoId },
            relations: ['profesionales', 'profesionales.especialidades'],
        });
        if (!centroMedico) {
            throw new common_1.NotFoundException(`Centro médico ${centroMedicoId} no encontrado`);
        }
        if (centroMedico.esProfesionalIndependiente) {
            throw new common_1.BadRequestException('Este prestador es un profesional independiente, no puede tener profesionales asociados');
        }
        return centroMedico.profesionales;
    }
    async agregarProfesionalIndependiente(centroMedicoId, profesionalId) {
        const centroMedico = await this.prestadorRepo.findOne({
            where: { id: centroMedicoId },
            relations: ['profesionales', 'especialidades', 'direccion'],
        });
        if (!centroMedico) {
            throw new common_1.NotFoundException(`Centro médico ${centroMedicoId} no encontrado`);
        }
        if (centroMedico.esProfesionalIndependiente) {
            throw new common_1.BadRequestException('Este prestador es un profesional independiente, no puede tener profesionales asociados');
        }
        const profesional = await this.prestadorRepo.findOne({
            where: { id: profesionalId },
            relations: ['especialidades', 'direccion'],
        });
        if (!profesional) {
            throw new common_1.NotFoundException(`Profesional ${profesionalId} no encontrado`);
        }
        if (!profesional.esProfesionalIndependiente) {
            throw new common_1.BadRequestException('Solo se pueden agregar profesionales independientes a un centro médico');
        }
        const especialidadesCentro = centroMedico.especialidades.map(e => e.id);
        const especialidadesProfesional = profesional.especialidades.map(e => e.id);
        const tieneEspecialidadEnComun = especialidadesProfesional.some(espId => especialidadesCentro.includes(espId));
        if (!tieneEspecialidadEnComun) {
            throw new common_1.BadRequestException('El profesional debe tener al menos una especialidad en común con el centro médico');
        }
        const yaExiste = centroMedico.profesionales.some(p => p.id === profesionalId);
        if (yaExiste) {
            throw new common_1.BadRequestException('Este profesional ya está asociado al centro médico');
        }
        for (const direccionCentro of centroMedico.direccion) {
            const yaExisteDireccion = profesional.direccion.some(d => d.esDireccionCentroMedico &&
                d.centroMedicoId === centroMedicoId &&
                d.calle === direccionCentro.calle &&
                d.numero === direccionCentro.numero);
            if (!yaExisteDireccion) {
                const nuevaDireccion = this.direccionRepo.create({
                    calle: direccionCentro.calle,
                    numero: direccionCentro.numero,
                    localidad: direccionCentro.localidad,
                    codigoPostal: direccionCentro.codigoPostal,
                    esDireccionCentroMedico: true,
                    centroMedicoId: centroMedicoId,
                    prestador: profesional,
                });
                await this.direccionRepo.save(nuevaDireccion);
            }
        }
        centroMedico.profesionales.push(profesional);
        return await this.prestadorRepo.save(centroMedico);
    }
    async eliminarProfesionalIndependiente(centroMedicoId, profesionalId) {
        const centroMedico = await this.prestadorRepo.findOne({
            where: { id: centroMedicoId },
            relations: ['profesionales'],
        });
        if (!centroMedico) {
            throw new common_1.NotFoundException(`Centro médico ${centroMedicoId} no encontrado`);
        }
        if (centroMedico.esProfesionalIndependiente) {
            throw new common_1.BadRequestException('Este prestador es un profesional independiente, no puede tener profesionales asociados');
        }
        const profesionalIndex = centroMedico.profesionales.findIndex(p => p.id === profesionalId);
        if (profesionalIndex === -1) {
            throw new common_1.NotFoundException('El profesional no está asociado a este centro médico');
        }
        await this.direccionRepo.delete({
            prestador: { id: profesionalId },
            esDireccionCentroMedico: true,
            centroMedicoId: centroMedicoId,
        });
        centroMedico.profesionales.splice(profesionalIndex, 1);
        await this.prestadorRepo.save(centroMedico);
    }
};
exports.PrestadoresService = PrestadoresService;
exports.PrestadoresService = PrestadoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prestador_entity_1.Prestador)),
    __param(1, (0, typeorm_1.InjectRepository)(especialidades_entity_1.Especialidad)),
    __param(2, (0, typeorm_1.InjectRepository)(direccionPrestador_entity_1.DireccionPrestador)),
    __param(3, (0, typeorm_1.InjectRepository)(horarioAtencion_entity_1.HorarioAtencion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PrestadoresService);
//# sourceMappingURL=prestadores.service.js.map