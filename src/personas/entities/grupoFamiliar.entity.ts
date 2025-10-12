import { Entity, 
    PrimaryColumn, 
    Column, 
    OneToMany 
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity('grupos_familiares')
export class GrupoFamiliar {
  @PrimaryColumn({ length: 50 })
  credencial: string;

  @Column({ length: 50 })
  planMedico: string;

  @Column({ default: 'Activo' })
  estado: string;

  @Column({ type: 'date' })
  fechaAlta: string;

  @Column({ type: 'date', nullable: true })
  fechaBaja: string | null;

  @OneToMany(() => Persona, (persona) => persona.grupoFamiliar, {
    cascade: true,
    eager: true,
  })
  personas: Persona[];
}
