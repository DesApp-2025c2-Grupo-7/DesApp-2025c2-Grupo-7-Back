import { Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn
} from 'typeorm';
import { Persona } from './persona.entity';


@Entity('direcciones-personas')
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calle: string;

  @Column()
  numero: string;

  @Column()
  localidad: string;

  @Column()
  codigoPostal: string;

  // Relación hacia Persona
  @ManyToOne(() => Persona, (persona) => persona.direccion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personaId' })
  persona: Persona;

  @Column()
  personaId: number;
}