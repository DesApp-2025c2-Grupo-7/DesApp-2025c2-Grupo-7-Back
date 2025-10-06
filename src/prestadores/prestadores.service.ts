import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestador } from '../prestadores/entities/prestador.entity';

@Injectable()
export class PrestadoresService {
    constructor(
        @InjectRepository(Prestador) private prestadorRepo: Repository<Prestador>,
    ) { }

    findAll(): Promise<Prestador[]> {
        return this.prestadorRepo.find();
    }

    async findOne(id: number): Promise<Prestador> {
        const a = await this.prestadorRepo.findOne({ where: { id } });
        if (!a) throw new NotFoundException(`Prestador ${id} no encontrado`);
        return a;
    }

    create(dto: Partial<Prestador>): Promise<Prestador> {
        const ent = this.prestadorRepo.create(dto);
        return this.prestadorRepo.save(ent);
    }

    async update(id: number, dto: Partial<Prestador>): Promise<Prestador> {
        await this.prestadorRepo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.prestadorRepo.delete(id);
    }

}
