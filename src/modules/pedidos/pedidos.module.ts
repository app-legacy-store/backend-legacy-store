import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Producto } from '../producto/entities/producto.entity';
import { PedidoProductoModule } from '../pedido-producto/pedido-producto.module';
import { PedidoProducto } from '../pedido-producto/entities/pedido-producto.entity';

@Module({
  imports: [
    AuthModule,
    PedidoProductoModule,
    TypeOrmModule.forFeature([
      Producto, 
      Pedido, 
      PedidoProducto
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService]
})
export class PedidosModule {}
