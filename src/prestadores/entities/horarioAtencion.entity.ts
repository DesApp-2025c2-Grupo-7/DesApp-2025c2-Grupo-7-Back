import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { DireccionPrestador } from './direccionPrestador.entity';
import { Especialidad } from '../../especialidades/entities/especialidades.entity'; 

@Entity('horarios_atencion')
export class HorarioAtencion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dia: string;

    @Column()
    desde: string;

    @Column()
    hasta: string;

    @Column()
    duracionTurno: string;

    @ManyToOne(() => DireccionPrestador, (d) => d.horariosAtencion, { onDelete: 'CASCADE' })
    direccion: DireccionPrestador;

    @ManyToOne(() => Especialidad, { eager: true, nullable: true })
    especialidad: Especialidad;
}
