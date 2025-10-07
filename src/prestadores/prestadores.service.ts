import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestador } from '../prestadores/entities/prestador.entity';
import { Especialidad } from '../especialidades/entities/especialidades.entity';

@Injectable()
export class PrestadoresService {
    constructor(
        @InjectRepository(Prestador)
        private prestadorRepo: Repository<Prestador>,
        @InjectRepository(Especialidad)
        private especialidadRepo: Repository<Especialidad>,
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
}
