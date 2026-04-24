import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { Cuenta } from 'src/entities/cuenta.entity';
import { CodigoOperacion } from 'src/entities/codigo-operacion.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cuenta, CodigoOperacion, Cliente, Producto]),
  ],
  providers: [CuentasService],
  controllers: [CuentasController],
})
export class CuentasModule {}
