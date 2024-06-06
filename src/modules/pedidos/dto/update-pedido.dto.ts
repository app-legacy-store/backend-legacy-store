import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsNumber } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {

   direccionEnvio: string;
   
   @IsNumber()
   cantTotalProductos?: number;
}
