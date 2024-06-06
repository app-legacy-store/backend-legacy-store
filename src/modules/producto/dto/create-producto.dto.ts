import { Categoria } from 'src/modules/categorias/entities/categoria.entity';
export class CreateProductoDto {
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    imagen?: string;
    categoria?: Categoria;
}
