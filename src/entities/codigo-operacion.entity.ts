import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaccion } from './transaccion.entity';

@Entity('codigos_operacion')
export class CodigoOperacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  descripcion: string;

  @Column()
  tipo_operacion: string;

  @OneToMany(() => Transaccion, (t) => t.codigoOperacion)
  transacciones: Transaccion[];
}
