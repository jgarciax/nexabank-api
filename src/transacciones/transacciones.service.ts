import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from 'src/entities/cuenta.entity';
import { CodigoOperacion } from 'src/entities/codigo-operacion.entity';
import { Transaccion } from 'src/entities/transaccion.entity';
import { CreateTransaccionDto } from './dto/create-transaccion.dto/create-transaccion.dto';
import { FiltroTransaccionesDto } from './dto/filtro-transacciones.dto';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepo: Repository<Cuenta>,

    @InjectRepository(CodigoOperacion)
    private codigoRepo: Repository<CodigoOperacion>,

    @InjectRepository(Transaccion)
    private transaccionRepo: Repository<Transaccion>,
  ) {}

  async crear(dto: CreateTransaccionDto) {
    try {
      const cuenta = await this.cuentaRepo.findOne({
        where: { numero_cuenta: dto.numeroCuenta },
      });

      if (!cuenta) {
        return {
          codigo_respuesta: 1,
          descripcion_respuesta: 'Cuenta no existe',
        };
      }

      if (cuenta.estatus !== 'ACTIVA') {
        return {
          codigo_respuesta: 2,
          descripcion_respuesta: 'Cuenta inactiva',
        };
      }

      const codigo = await this.codigoRepo.findOne({
        where: { id: dto.codigoOperacionId },
      });

      if (!codigo) {
        return {
          codigo_respuesta: 3,
          descripcion_respuesta: 'Codigo invalido',
        };
      }

      if (codigo.tipo_operacion === 'DEBITO') {
        if (Number(cuenta.saldo) < dto.monto) {
          return {
            codigo_respuesta: 4,
            descripcion_respuesta: 'Fondos insuficientes',
          };
        }
        cuenta.saldo = Number(cuenta.saldo) - dto.monto;
      } else {
        cuenta.saldo = Number(cuenta.saldo) + dto.monto;
      }

      await this.cuentaRepo.save(cuenta);

      const transaccion = this.transaccionRepo.create({
        cuenta: cuenta,
        codigoOperacion: codigo,
        monto: dto.monto,
        fecha_transaccion: new Date(dto.fecha),
      });

      const saved = await this.transaccionRepo.save(transaccion);

      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'Transacción realizada correctamente',
        id_transaccion: saved.id,
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error interno',
      };
    }
  }

  async obtenerHistorial(dto: FiltroTransaccionesDto) {
    try {
      if (dto.fechaInicio > dto.fechaFin) {
        return {
          codigo_respuesta: 5,
          descripcion_respuesta: 'Rango de fechas inválido',
        };
      }

      const data = await this.transaccionRepo
        .createQueryBuilder('t')
        .leftJoinAndSelect('t.cuenta', 'c')
        .leftJoinAndSelect('c.cliente', 'cl')
        .leftJoinAndSelect('t.codigoOperacion', 'co')
        .where('cl.id = :clienteId', { clienteId: dto.clienteId })
        .andWhere('t.fecha_transaccion BETWEEN :inicio AND :fin', {
          inicio: dto.fechaInicio,
          fin: dto.fechaFin,
        })
        .getMany();

      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'Ok',
        data: data.map((t) => ({
          idTransaccion: t.id,
          numeroCuenta: t.cuenta.numero_cuenta,
          nombreCliente: t.cuenta.cliente.nombre_completo,
          fecha: t.fecha_transaccion,
          monto: Number(t.monto),
          codigoOperacion: t.codigoOperacion.codigo,
          descripcion: t.codigoOperacion.descripcion,
          tipoOperacion: t.codigoOperacion.tipo_operacion,
        })),
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error obteniendo historial',
      };
    }
  }
}
