import { Pedido } from "src/modules/pedidos/entities/pedido.entity";
import { Producto } from "src/modules/producto/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidos-productos')
export class PedidoProducto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    @Column('int')
    cantidad: number;

    @Column('int')
    precioUnitario: number;

    @Column({ name: 'estado_pedido_producto',  default: 'pendiente' })
    estadoPedidoProducto: string;

    @Column('int')
    subTotal: number;

    @ManyToOne(
        () => Pedido, 
        pedido => pedido.pedidoProductos
    )
    @JoinColumn({ name: 'pedido_id' })
    pedido: Pedido;

    @ManyToOne(
        () => Producto, 
        producto => producto.pedidoProductos
    )
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

}

