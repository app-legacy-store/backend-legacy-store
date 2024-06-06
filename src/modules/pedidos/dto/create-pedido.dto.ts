import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePedidoDto {
    @IsOptional()
    @IsString()
    direccionEnvio?: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber() 
    cantidad: number;

    @IsNumber()
    cantTotalProductos?: number;
}
