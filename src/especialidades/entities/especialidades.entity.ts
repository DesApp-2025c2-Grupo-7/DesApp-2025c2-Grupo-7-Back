import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Prestador } from '../../prestadores/entities/prestador.entity';

@Entity('especialidades')
export class Especialidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nombre: string;

    @ManyToMany(() => Prestador, (prestador) => prestador.especialidades)
    prestadores: Prestador[];
}
