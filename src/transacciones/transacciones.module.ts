import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { Cuenta } from 'src/entities/cuenta.entity';
import { CodigoOperacion } from 'src/entities/codigo-operacion.entity';
import { Transaccion } from 'src/entities/transaccion.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cuenta,
      CodigoOperacion,
      Transaccion,
      Cliente,
      Producto,
    ]),
  ],

  providers: [TransaccionesService],
  controllers: [TransaccionesController],
})
export class TransaccionesModule {}
