import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CuentasService } from './cuentas.service';

@Controller('cuenta')
export class CuentasController {
  constructor(private readonly service: CuentasService) {}

  @Get('saldo')
  async obtenerSaldos() {
    return this.service.obtenerSaldos();
  }

  @Get('codigos-operacion')
  async obtenerCodigosOperacion() {
    return this.service.obtenerCodigosOperacion();
  }

  @Get()
  async obtenerTodas() {
    return this.service.obtenerTodas();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: Partial<{
      numero_cuenta: string;
      estatus: string;
      saldo: number;
    }>,
  ) {
    return this.service.actualizar(id, body);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}
