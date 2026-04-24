import { IsNumber, IsDateString } from 'class-validator';

export class FiltroTransaccionesDto {
  @IsNumber()
  clienteId: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;
}
