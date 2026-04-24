import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from 'src/entities/cuenta.entity';
import { CodigoOperacion } from 'src/entities/codigo-operacion.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class CuentasService {
  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepo: Repository<Cuenta>,

    @InjectRepository(CodigoOperacion)
    private codigoRepo: Repository<CodigoOperacion>,

    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async obtenerSaldos() {
    try {
      const cuentas = await this.cuentaRepo.find({
        relations: ['cliente', 'producto'],
      });

      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'OK',
        data: cuentas.map((c) => ({
          numeroCuenta: c.numero_cuenta,
          nombreCliente: c.cliente.nombre_completo,
          tipoCuenta: c.producto.tipo_producto,
          tasaInteres: c.producto.tasa_interes,
          saldo: Number(c.saldo),
          estatus: c.estatus,
        })),
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error obteniendo saldos',
      };
    }
  }

  async obtenerCodigosOperacion() {
    try {
      const codigos = await this.codigoRepo.find();
      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'OK',
        data: codigos,
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error obteniendo codigos de operacion',
      };
    }
  }

  async obtenerTodas() {
    try {
      const cuentas = await this.cuentaRepo.find({
        relations: ['cliente', 'producto'],
      });
      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'OK',
        data: cuentas,
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error obteniendo cuentas',
      };
    }
  }

  async obtenerPorId(id: number) {
    try {
      const cuenta = await this.cuentaRepo.findOne({
        where: { id },
        relations: ['cliente', 'producto', 'transacciones'],
      });

      if (!cuenta) {
        return {
          codigo_respuesta: 1,
          descripcion_respuesta: 'Cuenta no encontrada',
        };
      }

      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'OK',
        data: cuenta,
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error obteniendo cuenta',
      };
    }
  }

  async crear(body: {
    numero_cuenta: string;
    estatus: string;
    saldo: number;
    clienteId: number;
    productoId: number;
  }) {
    try {
      const cliente = await this.clienteRepo.findOne({
        where: { id: body.clienteId },
      });

      if (!cliente) {
        return {
          codigo_respuesta: 1,
          descripcion_respuesta: 'Cliente no encontrado',
        };
      }

      const producto = await this.productoRepo.findOne({
        where: { id: body.productoId },
      });

      if (!producto) {
        return {
          codigo_respuesta: 2,
          descripcion_respuesta: 'Producto no encontrado',
        };
      }

      const cuenta = this.cuentaRepo.create({
        numero_cuenta: body.numero_cuenta,
        estatus: body.estatus,
        saldo: body.saldo,
        cliente,
        producto,
      });

      const saved = await this.cuentaRepo.save(cuenta);

      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'OK',
        id: saved.id,
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error creando cuenta',
      };
    }
  }

  async actualizar(
    id: number,
    body: Partial<{
      numero_cuenta: string;
      estatus: string;
      saldo: number;
    }>,
  ) {
    try {
      const cuenta = await this.cuentaRepo.findOne({ where: { id } });

      if (!cuenta) {
        return {
          codigo_respuesta: 1,
          descripcion_respuesta: 'Cuenta no encontrada',
        };
      }

      Object.assign(cuenta, body);
      await this.cuentaRepo.save(cuenta);

      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'OK',
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error actualizando cuenta',
      };
    }
  }

  async eliminar(id: number) {
    try {
      const cuenta = await this.cuentaRepo.findOne({ where: { id } });

      if (!cuenta) {
        return {
          codigo_respuesta: 1,
          descripcion_respuesta: 'Cuenta no encontrada',
        };
      }

      await this.cuentaRepo.remove(cuenta);

      return {
        codigo_respuesta: 0,
        descripcion_respuesta: 'OK',
      };
    } catch {
      return {
        codigo_respuesta: 99,
        descripcion_respuesta: 'Error eliminando cuenta',
      };
    }
  }
}
