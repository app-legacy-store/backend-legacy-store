import { User } from "src/auth/entities/user.entity";
import { PedidoProducto } from "src/modules/pedido-producto/entities/pedido-producto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidos')
export class Pedido {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    fechaRegistro: Date
    
    @Column('text', { name: 'direccion_envio', nullable: true })
    direccionEnvio: string;

    @Column('text', { name: 'estado_pedido', default: 'pendiente' })
    estadoPedido: string;

    @Column('int', { name: 'total_pedido', nullable: true})
    totalPedido: number;

    @Column('int', { name: 'total_productos', nullable: true})
    cantTotalProductos: number;

    @Column('text', { name: 'tarjeta_pago', nullable: true })
    tarjetaPago: string;

    @OneToMany(
        () => PedidoProducto, 
        pedidoProducto => pedidoProducto.pedido
    )
    pedidoProductos: PedidoProducto[];

    @ManyToOne(
        () => User, 
        user => user.pedido
    )
    user: User;

}
