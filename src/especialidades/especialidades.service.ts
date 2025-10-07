import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from './entities/especialidades.entity';

@Injectable()
export class EspecialidadesService {
    constructor(
        @InjectRepository(Especialidad) private repo: Repository<Especialidad>,
    ) {}

    findAll(): Promise<Especialidad[]> {
        return this.repo.find();
    }

    async findOne(id: number): Promise<Especialidad> {
        const e = await this.repo.findOne({ where: { id } });
        if (!e) throw new NotFoundException(`Especialidad ${id} no encontrada`);
        return e;
    }

    create(dto: Partial<Especialidad>): Promise<Especialidad> {
        const ent = this.repo.create(dto);
        return this.repo.save(ent);
    }

    async update(id: number, dto: Partial<Especialidad>): Promise<Especialidad> {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
