import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { DireccionPrestador } from './direccionPrestador.entity';

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
}
