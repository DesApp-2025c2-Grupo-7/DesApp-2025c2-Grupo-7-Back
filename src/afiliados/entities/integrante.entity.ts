import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Afiliado } from './afiliado.entity';

@Entity('integrantes')
export class Integrante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    credencial: string;

    @Column({ length: 10, nullable: true })
    sufijo: string;

    @Column()
    tipoDocumento: string;

    @Column()
    numeroDocumento: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ type: 'date', nullable: true })
    fechaNacimiento: string;

    @Column({ type: 'json', nullable: true })
    telefono: string[];

    @Column({ type: 'json', nullable: true })
    email: string[];

    @Column({ type: 'json', nullable: true })
    direccion: any[];

    @Column()
    parentesco: string;

    @Column({ type: 'json', nullable: true })
    situacionesTerapeuticas: any[];

    @Column()
    planMedico: string;

    @Column({ type: 'date', nullable: true })
    fechaAlta: string;

    @Column({ type: 'date', nullable: true })
    fechaBaja: string | null;

    @ManyToOne(() => Afiliado, (a) => a.grupoFamiliar, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'afiliadoId' })
    afiliado: Afiliado;

    @Column({ nullable: true })
    afiliadoId: number;
}
