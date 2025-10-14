import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestador } from '../prestadores/entities/prestador.entity';
import { Direccion } from '../prestadores/entities/direccion.entity';
import { Especialidad } from '../especialidades/entities/especialidades.entity';
import { HorarioAtencion } from './entities/horarioAtencion.entity';

@Injectable()
export class PrestadoresService {
    constructor(
        @InjectRepository(Prestador)
        private prestadorRepo: Repository<Prestador>,
        @InjectRepository(Especialidad)
        private especialidadRepo: Repository<Especialidad>,
        @InjectRepository(Direccion)
        private direccionRepo: Repository<Direccion>,
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


    // ────────────── Obtener todas las direcciones de un prestador ──────────────
    async getDirecciones(prestadorId: number): Promise<Direccion[]> {
        const prestador = await this.prestadorRepo.findOne({
            where: { id: prestadorId },
            relations: ['direccion'],
        });
        if (!prestador) throw new NotFoundException('Prestador no encontrado');
        return prestador.direccion;
    }

    // ────────────── Agregar una dirección ──────────────
    async addDireccion(prestadorId: number, dto: Partial<Direccion>): Promise<Direccion> {
        const prestador = await this.prestadorRepo.findOne({ where: { id: prestadorId } });
        if (!prestador) throw new NotFoundException('Prestador no encontrado');

        const nuevaDireccion = this.direccionRepo.create({ ...dto, prestador });
        return this.direccionRepo.save(nuevaDireccion);
    }

    // ────────────── Actualizar una dirección ──────────────
    async updateDireccion(prestadorId: number, direccionId: number, dto: Partial<Direccion>): Promise<Direccion> {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId, prestador: { id: prestadorId } },
            relations: ['prestador'],
        });
        if (!direccion) throw new NotFoundException('Dirección no encontrada o no pertenece al prestador');

        Object.assign(direccion, dto);
        return this.direccionRepo.save(direccion);
    }

    // ────────────── Eliminar una dirección ──────────────
    async deleteDireccion(prestadorId: number, direccionId: number): Promise<void> {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId, prestador: { id: prestadorId } },
        });
        if (!direccion) throw new NotFoundException('Dirección no encontrada o no pertenece al prestador');

        await this.direccionRepo.delete(direccionId);
    }
    // ------------------------------- Horarios ATENCION-------------------------------
    // ────────────── CRUD de horarios de atención ──────────────

    async getHorarios(direccionId: number): Promise<HorarioAtencion[]> {
        const direccion = await this.direccionRepo.findOne({
            where: { id: direccionId },
            relations: ['horariosAtencion'],
        });
        if (!direccion) throw new NotFoundException('Dirección no encontrada');
        return direccion.horariosAtencion;
    }

    async addHorario(direccionId: number, dto: Partial<HorarioAtencion>): Promise<HorarioAtencion> {
        const direccion = await this.direccionRepo.findOne({ where: { id: direccionId } });
        if (!direccion) throw new NotFoundException('Dirección no encontrada');

        const nuevoHorario = this.horarioRepo.create({ ...dto, direccion });
        return this.horarioRepo.save(nuevoHorario);
    }

    async updateHorario(direccionId: number, horarioId: number, dto: Partial<HorarioAtencion>): Promise<HorarioAtencion> {
        const horario = await this.horarioRepo.findOne({
            where: { id: horarioId, direccion: { id: direccionId } },
            relations: ['direccion'],
        });
        if (!horario) throw new NotFoundException('Horario no encontrado o no pertenece a la dirección');

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
}
