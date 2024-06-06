import { Producto } from "src/modules/producto/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column('text', {name:'img_producto', nullable: true })
    imagenProducto?: string;

    @Column('text', { name:'img_banner', nullable: true })
    imagenBanner?: string;

    @OneToMany(
        () => Producto, 
            producto => producto.categoria 
    )
    productos: Producto[]
}
