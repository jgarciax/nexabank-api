import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Producto } from './producto.entity';
import { Transaccion } from './transaccion.entity';

@Entity('cuentas')
export class Cuenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero_cuenta: string;

  @Column()
  estatus: string;

  @Column('decimal')
  saldo: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.cuentas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Producto, (producto) => producto.cuentas)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @OneToMany(() => Transaccion, (t) => t.cuenta)
  transacciones: Transaccion[];
}
