import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cuenta } from './cuenta.entity';
import { CodigoOperacion } from './codigo-operacion.entity';

@Entity('transacciones')
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.transacciones)
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: Cuenta;

  @ManyToOne(() => CodigoOperacion, (c) => c.transacciones)
  @JoinColumn({ name: 'codigo_operacion_id' })
  codigoOperacion: CodigoOperacion;

  @Column('decimal')
  monto: number;

  @Column()
  fecha_transaccion: Date;
}
