import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cuenta } from './cuenta.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  tasa_interes: number;

  @Column()
  tipo_producto: string;

  @Column()
  calculo_interes: string;

  @OneToMany(() => Cuenta, (cuenta) => cuenta.producto)
  cuentas: Cuenta[];
}
