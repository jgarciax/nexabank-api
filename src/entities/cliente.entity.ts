import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cuenta } from './cuenta.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_completo: string;

  @Column()
  dpi: string;

  @Column()
  fecha_nacimiento: Date;

  @Column()
  sexo: string;

  @Column()
  pais_nacimiento: string;

  @OneToMany(() => Cuenta, (cuenta) => cuenta.cliente)
  cuentas: Cuenta[];
}
