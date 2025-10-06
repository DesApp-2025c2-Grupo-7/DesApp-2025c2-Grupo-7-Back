import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Prestador } from './prestador.entity';
import { HorarioAtencion } from '../entities/horarioAtencion.entity';

@Entity('direcciones')
export class Direccion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    calle: string;

    @Column()
    numero: string;

    @Column()
    localidad: string;

    @Column()
    codigoPostal: string;

    @ManyToOne(() => Prestador, (p) => p.direccion, { onDelete: 'CASCADE' })
    prestador: Prestador;

    @OneToMany(() => HorarioAtencion, (h) => h.direccion, { cascade: true, eager: true })
    horariosAtencion: HorarioAtencion[];
}
