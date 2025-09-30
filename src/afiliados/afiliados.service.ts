import { Injectable } from '@nestjs/common';
import afiliadosData from '../data/afiliados.json'; // importa el JSON directo
import type { Afiliado } from './interfaces/afiliado.interface';

@Injectable()
export class AfiliadosService {
    private afiliados: Afiliado[] = afiliadosData;

    findAll(q?: string): Afiliado[] {
        if (!q) return this.afiliados;
        return this.afiliados.filter(
            (a) =>
                a.nombre.toLowerCase().includes(q.toLowerCase()) ||
                a.apellido.toLowerCase().includes(q.toLowerCase()) ||
                a.numeroDocumento.includes(q),
        );
    }

    findOne(id: number): Afiliado | undefined {
        return this.afiliados.find((a) => a.id === id);
    }
}

