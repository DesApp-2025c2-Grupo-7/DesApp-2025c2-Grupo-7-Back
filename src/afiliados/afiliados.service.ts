import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Afiliado } from './entities/afiliado.entity';
import { Integrante } from './entities/integrante.entity';

@Injectable()
export class AfiliadosService {
    constructor(
        @InjectRepository(Afiliado) private afiliadoRepo: Repository<Afiliado>,
        @InjectRepository(Integrante) private integranteRepo: Repository<Integrante>,
    ) { }

    findAll(): Promise<Afiliado[]> {
        return this.afiliadoRepo.find();
    }

    async findOne(id: number): Promise<Afiliado> {
        const a = await this.afiliadoRepo.findOne({ where: { id } });
        if (!a) throw new NotFoundException(`Afiliado ${id} no encontrado`);
        return a;
    }

    create(dto: Partial<Afiliado>): Promise<Afiliado> {
        const ent = this.afiliadoRepo.create(dto);
        return this.afiliadoRepo.save(ent);
    }

    async update(id: number, dto: Partial<Afiliado>): Promise<Afiliado> {
        await this.afiliadoRepo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.afiliadoRepo.delete(id);
    }

    async addIntegrante(afiliadoId: number, integranteDto: Partial<Integrante>) {
        const afiliado = await this.findOne(afiliadoId);
        const integrante = this.integranteRepo.create({ ...integranteDto, afiliado });
        return this.integranteRepo.save(integrante);
    }
}
