import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { DireccionPrestador } from './direccionPrestador.entity';
import { Especialidad } from '../../especialidades/entities/especialidades.entity';

@Entity('prestadores')
export class Prestador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11 })
    numeroCUIL: string;

    @Column()
    nombreCompleto: string;

    @ManyToMany(() => Especialidad, { eager: true, cascade: true })
    @JoinTable()
    especialidades: Especialidad[];

    @Column({ default: false })
    esProfesionalIndependiente: boolean;

    @Column({ type: 'json', nullable: true })
    telefono: string[];

    @Column({ type: 'json', nullable: true })
    email: string[];

    @OneToMany(() => DireccionPrestador, (direccion) => direccion.prestador, { cascade: true, eager: true, onDelete: 'CASCADE',})
    direccion: DireccionPrestador[];
}
