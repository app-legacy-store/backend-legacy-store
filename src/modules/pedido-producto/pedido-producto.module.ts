import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoProductoService } from './pedido-producto.service';
import { PedidoProductoController } from './pedido-producto.controller';
import { PedidoProducto } from './entities/pedido-producto.entity';
import { ProductoModule } from '../producto/producto.module';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Tarjeta } from '../tarjeta/entities/tarjeta.entity';
import { Direccion } from '../direccion/entities/direccion.entity';

@Module({
  imports: [
    ProductoModule,
    TypeOrmModule.forFeature([
      PedidoProducto,
      Pedido,
      Producto,
      Tarjeta,
      Direccion,
    ]),
  ],
  controllers: [PedidoProductoController],
  providers: [PedidoProductoService],
  exports: [PedidoProductoService]
})
export class PedidoProductoModule {}
