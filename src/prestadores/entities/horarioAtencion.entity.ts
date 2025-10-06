import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Direccion } from './direccion.entity';

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

    @ManyToOne(() => Direccion, (d) => d.horariosAtencion, { onDelete: 'CASCADE' })
    direccion: Direccion;
}
