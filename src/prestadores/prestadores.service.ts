import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prestador } from './interfaces/prestador.interface';
import prestadoresData from '../data/prestadores.json';

@Injectable()
export class PrestadoresService {
    private prestadores: Prestador[] = prestadoresData;

    findAll(q?: string): Prestador[] {
        if (!q) return this.prestadores;
        return this.prestadores.filter(
            p =>
                p.nombreCompleto.toLowerCase().includes(q.toLowerCase()) ||
                p.numeroCUIL.includes(q)
        );
    }

    findOne(id: number): Prestador {
        const prestador = this.prestadores.find(p => p.id === id);
        if (!prestador) throw new NotFoundException('Prestador no encontrado');
        return prestador;
    }
}
