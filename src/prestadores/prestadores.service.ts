import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prestador, HorarioAtencion } from './interfaces/prestador.interface';
import prestadoresData from '../data/prestadores.json';

@Injectable()
export class PrestadoresService {
    private prestadores: Prestador[] = prestadoresData;

    private calcularHorarioHasta(desde: string, duracionTurno: string, cantidadEspecialidades: number): string {
        const [horas, minutos] = desde.split(':').map(Number);
        const duracionEnMinutos = parseInt(duracionTurno.replace(/\D/g, ''));
        const turnosPorEspecialidad = 10;
        const totalTurnos = turnosPorEspecialidad * cantidadEspecialidades;
        const tiempoTotalMinutos = totalTurnos * duracionEnMinutos;
        
        const fechaInicio = new Date();
        fechaInicio.setHours(horas, minutos, 0, 0);
        
        const fechaFin = new Date(fechaInicio.getTime() + tiempoTotalMinutos * 60000);
        
        const horasFin = fechaFin.getHours().toString().padStart(2, '0');
        const minutosFin = fechaFin.getMinutes().toString().padStart(2, '0');
        
        return `${horasFin}:${minutosFin}`;
    }

    private procesarPrestadorConHorarios(prestador: Prestador): Prestador {
        const prestadorProcesado = { ...prestador };
        prestadorProcesado.direccion = prestador.direccion.map(dir => ({
            ...dir,
            horariosAtencion: dir.horariosAtencion.map(horario => ({
                ...horario,
                hasta: this.calcularHorarioHasta(horario.desde, horario.duracionTurno, prestador.especialidades.length)
            }))
        }));
        return prestadorProcesado;
    }

    findAll(q?: string): Prestador[] {
        let prestadores = this.prestadores;
        if (q) {
            prestadores = prestadores.filter(
                p =>
                    p.nombreCompleto.toLowerCase().includes(q.toLowerCase()) ||
                    p.numeroCUIL.includes(q)
            );
        }
        return prestadores.map(p => this.procesarPrestadorConHorarios(p));
    }

    findOne(id: number): Prestador {
        const prestador = this.prestadores.find(p => p.id === id);
        if (!prestador) throw new NotFoundException('Prestador no encontrado');
        return this.procesarPrestadorConHorarios(prestador);
    }
}
