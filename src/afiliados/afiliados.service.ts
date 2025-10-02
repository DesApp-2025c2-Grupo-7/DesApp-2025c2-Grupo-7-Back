import { Injectable } from '@nestjs/common';
import afiliadosData from '../data/afiliados.json';
import type { Afiliado } from './interfaces/afiliado.interface';

@Injectable()
export class AfiliadosService {
    private afiliados: Afiliado[] = afiliadosData;

    findAll(q?: string, grupoFamiliar?: string): Afiliado[] {
        let result = this.afiliados;
        
        if (grupoFamiliar) {
            result = result.filter((a) => a.grupoFamiliar === grupoFamiliar);
        }
        
        if (q) {
            result = result.filter(
                (a) =>
                    a.nombre.toLowerCase().includes(q.toLowerCase()) ||
                    a.apellido.toLowerCase().includes(q.toLowerCase()) ||
                    a.numeroDocumento.includes(q),
            );
        }
        
        return result;
    }

    findOne(id: number): Afiliado | undefined {
        return this.afiliados.find((a) => a.id === id);
    }

    findByGrupoFamiliar(grupoFamiliar: string): Afiliado[] {
        return this.afiliados.filter((a) => a.grupoFamiliar === grupoFamiliar);
    }

    findTitularByGrupo(grupoFamiliar: string): Afiliado | undefined {
        return this.afiliados.find((a) => a.grupoFamiliar === grupoFamiliar && a.titularId === null);
    }

    findDependientesByTitular(titularId: number): Afiliado[] {
        return this.afiliados.filter((a) => a.titularId === titularId);
    }
}

