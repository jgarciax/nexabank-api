import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateTransaccionDto {
  @IsString()
  numeroCuenta: string;

  @IsDateString()
  fecha: string;

  @IsNumber()
  monto: number;

  @IsNumber()
  codigoOperacionId: number;
}
