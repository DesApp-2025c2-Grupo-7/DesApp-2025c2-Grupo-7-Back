import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestador } from '../prestadores/entities/prestador.entity';
import { DireccionPrestador } from './entities/direccionPrestador.entity';
import { Especialidad } from '../especialidades/entities/especialidades.entity';
import { HorarioAtencion } from './entities/horarioAtencion.entity';

@Injectable()
export class PrestadoresService {
    constructor(
        @InjectRepository(Prestador)
        private prestadorRepo: Repository<Prestador>,
        @InjectRepository(Especialidad)
        private especialidadRepo: Repository<Especialidad>,
        @InjectRepository(DireccionPrestador)
        private direccionRepo: Repository<DireccionPrestador>,
        @InjectRepository(HorarioAtencion)
        private horarioRepo: Repository<HorarioAtencion>,
    ) { }

    findAll(): Promise<Prestador[]> {
        return this.prestadorRepo.find({ relations: ['especialidades'] });
    }

    async findOne(id: number): Promise<Prestador> {
        const prestador = await this.prestadorRepo.findOne({
            where: { id },
            relations: ['especialidades'],
        });
        if (!prestador) throw new NotFoundException(`Prestador ${id} no encontrado`);
        return prestador;
    }

    async create(dto: Partial<Prestador>, especialidadIds: number[]): Promise<Prestador> {
        const prestador = this.prestadorRepo.create(dto);

        if (especialidadIds.length > 0) {
            const especialidades = await this.especialidadRepo.findByIds(especialidadIds);
            prestador.especialidades = especialidades;
        }

        return this.prestadorRepo.save(prestador);
    }

    async update(id: number, dto: Partial<Prestador>, especialidadIds: number[]): Promise<Prestador> {
        const prestador = await this.findOne(id);

        Object.assign(prestador, dto);

        if (especialidadIds.length > 0) {
            const especialidades = await this.especialidadRepo.findByIds(especialidadIds);
            prestador.especialidades = especialidades;
        }

        return this.prestadorRepo.save(prestador);
    }

    async remove(id: number): Promise<void> {
        await this.prestadorRepo.delete(id);
    }

    // ────────────── Direcciones ──────────────

    async getDirecciones(prestadorId: number): Promise<DireccionPrestador[]> {
        const prestador = await this.prestadorRepo.findOne({
            where: { id: prestadorId },
            relations: ['direccion'],
        });
        if (!prestador) throw new NotFoundException('Prestador no encontrado');
        return prestador.direccion;
    }

    async addDireccion(prestadorId: number, dto: Partial<DireccionPrestador>): Promise<DireccionPrestador> {
        const prestador = await this.prestadorRepo.findOne({ where: { id: prestadorId } });
        if (!prestador) throw new NotFoundException('Prestador no encontrado');

        const nuevaDireccion = this.direccionRepo.create({ ...dto, prestador });
        return this.direccionRepo.save(nuevaDireccion);
    }

    async updateDireccion(prestadorId: number, direccionId: number, dto: Partial<DireccionPrestador>): Promise<DireccionPrestador> {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId, prestador: { id: prestadorId } },
            relations: ['prestador'],
        });
        if (!direccion) throw new NotFoundException('Dirección no encontrada o no pertenece al prestador');

        Object.assign(direccion, dto);
        return this.direccionRepo.save(direccion);
    }

    async deleteDireccion(prestadorId: number, direccionId: number): Promise<void> {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId, prestador: { id: prestadorId } },
        });
        if (!direccion) throw new NotFoundException('Dirección no encontrada o no pertenece al prestador');

        await this.direccionRepo.delete(direccionId);
    }

    // ────────────── Horarios con especialidad ──────────────

    async getHorarios(direccionId: number): Promise<HorarioAtencion[]> {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId },
            relations: ['horariosAtencion', 'horariosAtencion.especialidad'],
        });
        if (!direccion) throw new NotFoundException('Dirección no encontrada');
        return direccion.horariosAtencion;
    }

    async addHorario(
        direccionId: number,
        dto: Partial<HorarioAtencion> & { especialidadId?: number },
    ): Promise<HorarioAtencion> {
        const direccion = await this.direccionRepo.findOne({ where: { id: direccionId } });
        if (!direccion) throw new NotFoundException('Dirección no encontrada');

        let especialidad: Especialidad | undefined = undefined;

        if (dto.especialidadId) {
            const found = await this.especialidadRepo.findOne({ where: { id: dto.especialidadId } });
            if (!found) throw new NotFoundException('Especialidad no encontrada');
            especialidad = found;
        }
        const nuevoHorario = this.horarioRepo.create({
            ...dto,
            direccion,
            especialidad,
        });
        return await this.horarioRepo.save(nuevoHorario);
    }


    async updateHorario(
        direccionId: number,
        horarioId: number,
        dto: Partial<HorarioAtencion> & { especialidadId?: number },
    ): Promise<HorarioAtencion> {
        const horario = await this.horarioRepo.findOne({
            where: { id: horarioId, direccion: { id: direccionId } },
            relations: ['direccion', 'especialidad'],
        });
        if (!horario) throw new NotFoundException('Horario no encontrado o no pertenece a la dirección');

        if (dto.especialidadId) {
            const especialidad = await this.especialidadRepo.findOne({ where: { id: dto.especialidadId } });
            if (!especialidad) throw new NotFoundException('Especialidad no encontrada');
            horario.especialidad = especialidad;
        }

        Object.assign(horario, dto);
        return this.horarioRepo.save(horario);
    }

    async deleteHorario(direccionId: number, horarioId: number): Promise<void> {
        const horario = await this.horarioRepo.findOne({
            where: { id: horarioId, direccion: { id: direccionId } },
        });
        if (!horario) throw new NotFoundException('Horario no encontrado o no pertenece a la dirección');

        await this.horarioRepo.delete(horarioId);
    }


    // ADMINISTRAR PROFESIONALES INDEPENDIENTES EN CENTROS MÉDICOS ──────────────

    async getProfesionalesIndependientes(centroMedicoId: number): Promise<Prestador[]> {
        const centroMedico = await this.prestadorRepo.findOne({
            where: { id: centroMedicoId },
            relations: ['profesionales', 'profesionales.especialidades'],
        });

        if (!centroMedico) {
            throw new NotFoundException(`Centro médico ${centroMedicoId} no encontrado`);
        }

        if (centroMedico.esProfesionalIndependiente) {
            throw new BadRequestException('Este prestador es un profesional independiente, no puede tener profesionales asociados');
        }

        return centroMedico.profesionales;
    }

    async agregarProfesionalIndependiente(centroMedicoId: number, profesionalId: number): Promise<Prestador> {
        const centroMedico = await this.prestadorRepo.findOne({
            where: { id: centroMedicoId },
            relations: ['profesionales', 'especialidades', 'direccion'],
        });

        if (!centroMedico) {
            throw new NotFoundException(`Centro médico ${centroMedicoId} no encontrado`);
        }

        if (centroMedico.esProfesionalIndependiente) {
            throw new BadRequestException('Este prestador es un profesional independiente, no puede tener profesionales asociados');
        }

        const profesional = await this.prestadorRepo.findOne({
            where: { id: profesionalId },
            relations: ['especialidades', 'direccion'],
        });

        if (!profesional) {
            throw new NotFoundException(`Profesional ${profesionalId} no encontrado`);
        }

        if (!profesional.esProfesionalIndependiente) {
            throw new BadRequestException('Solo se pueden agregar profesionales independientes a un centro médico');
        }

        // ✅ VALIDACIÓN: El profesional debe tener al menos una especialidad en común con el centro
        const especialidadesCentro = centroMedico.especialidades.map(e => e.id);
        const especialidadesProfesional = profesional.especialidades.map(e => e.id);

        const tieneEspecialidadEnComun = especialidadesProfesional.some(
            espId => especialidadesCentro.includes(espId)
        );

        if (!tieneEspecialidadEnComun) {
            throw new BadRequestException(
                'El profesional debe tener al menos una especialidad en común con el centro médico'
            );
        }

        // Verificar si ya existe la relación
        const yaExiste = centroMedico.profesionales.some(p => p.id === profesionalId);
        if (yaExiste) {
            throw new BadRequestException('Este profesional ya está asociado al centro médico');
        }

        // ✅ AGREGAR DIRECCIONES DEL CENTRO AL PROFESIONAL
        for (const direccionCentro of centroMedico.direccion) {
            // Verificar si el profesional ya tiene esta dirección del centro
            const yaExisteDireccion = profesional.direccion.some(
                d => d.esDireccionCentroMedico &&
                    d.centroMedicoId === centroMedicoId &&
                    d.calle === direccionCentro.calle &&
                    d.numero === direccionCentro.numero
            );

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

    async eliminarProfesionalIndependiente(centroMedicoId: number, profesionalId: number): Promise<void> {
        const centroMedico = await this.prestadorRepo.findOne({
            where: { id: centroMedicoId },
            relations: ['profesionales'],
        });

        if (!centroMedico) {
            throw new NotFoundException(`Centro médico ${centroMedicoId} no encontrado`);
        }

        if (centroMedico.esProfesionalIndependiente) {
            throw new BadRequestException('Este prestador es un profesional independiente, no puede tener profesionales asociados');
        }

        const profesionalIndex = centroMedico.profesionales.findIndex(p => p.id === profesionalId);

        if (profesionalIndex === -1) {
            throw new NotFoundException('El profesional no está asociado a este centro médico');
        }

        // ✅ ELIMINAR DIRECCIONES DEL CENTRO MÉDICO DEL PROFESIONAL
        await this.direccionRepo.delete({
            prestador: { id: profesionalId },
            esDireccionCentroMedico: true,
            centroMedicoId: centroMedicoId,
        });

        centroMedico.profesionales.splice(profesionalIndex, 1);
        await this.prestadorRepo.save(centroMedico);
    }
}
