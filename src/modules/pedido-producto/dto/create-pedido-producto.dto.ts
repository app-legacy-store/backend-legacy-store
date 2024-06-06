import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePedidoProductoDto {

  @IsNotEmpty()
  @IsString()
  productoId: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  precioUnitario: number;

}
