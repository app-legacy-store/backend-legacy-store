import { Categoria } from "src/modules/categorias/entities/categoria.entity";
import { PedidoProducto } from "src/modules/pedido-producto/entities/pedido-producto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('productos')
export class Producto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{ nullable: false })
    nombre: string;

    @Column('text', { nullable: false })
    descripcion: string;

    @Column('int', { nullable: true, name: 'precio' })
    precio: number;
  
    @Column('int', { nullable: true, default: 0, name: 'stock' })
    stock: number;

    @Column()
    imagen: string;

    @OneToMany(
        () => PedidoProducto, 
        pedidoProducto => pedidoProducto.producto
    )
    pedidoProductos: PedidoProducto[];

    @ManyToOne(
        () => Categoria, 
        categoria => categoria.productos
    )
    categoria: Categoria;
    
}
