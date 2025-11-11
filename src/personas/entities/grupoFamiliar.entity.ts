import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Persona } from './persona.entity';

@Entity('grupos_familiares')
export class GrupoFamiliar {
  @PrimaryGeneratedColumn()
  id: number; // ID interno autoincremental

  @Column({ length: 50, unique: true })
  credencial: string;

  @Column({ length: 50 })
  planMedico: string;

  @Column({ default: 'Activo' })
  estado: string;

  @Column({ type: 'date' })
  fechaAlta: string;

  @Column({ type: 'date', nullable: true })
  fechaBaja: string | null;

  @OneToMany(() => Persona, (persona) => persona.grupoFamiliar, { eager: true })
  personas: Persona[];
}
