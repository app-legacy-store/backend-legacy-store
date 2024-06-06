import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { Categoria } from 'src/modules/categorias/entities/categoria.entity';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    nombre: string;
    descripcion: string;
    precio: number;
    stock?: number;
    imagen: string;
    categoria: Categoria;

}
