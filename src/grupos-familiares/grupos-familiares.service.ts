import { Injectable } from '@nestjs/common';
import gruposFamiliaresData from '../data/grupos-familiares.json';
import type { GrupoFamiliar } from '../afiliados/interfaces/afiliado.interface';

@Injectable()
export class GruposFamiliaresService {
    private gruposFamiliares: GrupoFamiliar[] = gruposFamiliaresData;

    findAll(): GrupoFamiliar[] {
        return this.gruposFamiliares;
    }

    findOne(id: string): GrupoFamiliar | undefined {
        return this.gruposFamiliares.find((g) => g.id === id);
    }

    findByTitular(titularId: number): GrupoFamiliar | undefined {
        return this.gruposFamiliares.find((g) => g.titularId === titularId);
    }
}