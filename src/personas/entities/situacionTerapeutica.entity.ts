import { Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Persona } from './persona.entity';


@Entity('situaciones_terapeuticas')
export class SituacionTerapeutica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  diagnostico: string;

  @Column({ type: 'date', nullable: true })
  fechaInicio: string;

  @Column({ type: 'date', nullable: true })
  fechaFin: string;

  @ManyToOne(() => Persona, (persona) => persona.situacionesTerapeuticas, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personaId' })
  persona?: Persona;

  @Column()
  personaId?: number;
}
