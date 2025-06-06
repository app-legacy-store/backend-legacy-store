import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoProductoDto } from './create-pedido-producto.dto';

export class UpdatePedidoProductoDto extends PartialType(CreatePedidoProductoDto) {
   // @IsOptional()
   // @IsNumber()
   // cantProducto?: number;

   // @IsOptional()
   // @IsNumber()
   // precioUnitario?: number;

   // @IsOptional()
   // @IsDateString()
   // fechaRegistro?: Date;
   cantProducto?: number;
   precioUnitario?: number;
}
