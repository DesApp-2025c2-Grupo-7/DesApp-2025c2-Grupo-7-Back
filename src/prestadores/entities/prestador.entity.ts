import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Direccion } from './direccion.entity';

@Entity('prestadores')
export class Prestador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11 })
    numeroCUIL: string;

    @Column()
    nombreCompleto: string;

    @Column({ type: 'json', nullable: true })
    especialidades: string[];

    @Column({ default: false })
    esProfesionalIndependiente: boolean;

    @Column({ type: 'json', nullable: true })
    telefono: string[];

    @Column({ type: 'json', nullable: true })
    email: string[];

    @OneToMany(() => Direccion, (d) => d.prestador, { cascade: true, eager: true })
    direccion: Direccion[];
}
