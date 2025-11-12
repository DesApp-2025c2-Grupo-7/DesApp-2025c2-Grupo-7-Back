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

    @Column({ type: 'date' })
    fechaAlta: string;

    @Column({ type: 'date', nullable: true })
    fechaBaja: string | null;

    @OneToMany(() => DireccionPrestador, (direccion) => direccion.prestador, { cascade: true, eager: true, onDelete: 'CASCADE',})
    direccion: DireccionPrestador[];

    // Relación: Un centro médico tiene muchos profesionales
    @ManyToMany(() => Prestador, (prestador) => prestador.centrosMedicos)
    @JoinTable({
        name: 'centro_profesionales',
        joinColumn: { name: 'centro_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'profesional_id', referencedColumnName: 'id' },
    })
    profesionales: Prestador[];

    // Relación inversa: Un profesional puede pertenecer a muchos centros
    @ManyToMany(() => Prestador, (prestador) => prestador.profesionales)
    centrosMedicos: Prestador[];
}
