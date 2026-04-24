import { Controller, Post, Body } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto/create-transaccion.dto';
import { FiltroTransaccionesDto } from './dto/filtro-transacciones.dto';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly service: TransaccionesService) {}

  @Post('create')
  async crear(@Body() dto: CreateTransaccionDto) {
    return this.service.crear(dto);
  }

  @Post('historial')
  async obtenerHistorial(@Body() dto: FiltroTransaccionesDto) {
    return this.service.obtenerHistorial(dto);
  }
}
