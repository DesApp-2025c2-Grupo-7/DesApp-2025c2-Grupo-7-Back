import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { GrupoFamiliar } from './grupoFamiliar.entity';
import { DireccionPersona } from './direccionPersona.entity';
import { SituacionTerapeutica } from './situacionTerapeutica.entity';

@Entity('personas')
@Unique(['credencial', 'sufijo'])
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  credencial: string;

  @Column({ length: 10 })
  sufijo: string;

  @Column({ type: 'enum', enum: ['AFILIADO', 'INTEGRANTE'] })
  tipoPersona: 'AFILIADO' | 'INTEGRANTE';

  @Column({ length: 20 })
  tipoDocumento: string;

  @Column({ length: 20 })
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

  @Column({ nullable: true })
  parentesco?: string;

  @OneToMany(() => DireccionPersona, (direccion) => direccion.persona, { cascade: true, eager: true })
  direccion: DireccionPersona[];

  @OneToMany(() => SituacionTerapeutica, (sit) => sit.persona, { cascade: true, eager: true })
  situacionesTerapeuticas?: SituacionTerapeutica[];

  @ManyToOne(() => GrupoFamiliar, (grupo) => grupo.personas)
  @JoinColumn({ name: 'grupoFamiliarId' })
  grupoFamiliar: GrupoFamiliar;

  @Column()
  grupoFamiliarId: string; // FK hacia GrupoFamiliar

  @Column({ nullable: true })
  planMedico: string;

  @Column({ type: 'date' })
  fechaAlta: string;

  @Column({ type: 'date', nullable: true })
  fechaBaja: string | null;
}
