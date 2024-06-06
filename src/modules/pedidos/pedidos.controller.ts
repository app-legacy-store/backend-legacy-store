import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoProductoService } from '../pedido-producto/pedido-producto.service';

@Controller('pedidos')
export class PedidosController {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly pedidoService: PedidosService,
    private readonly pedidoProductoService: PedidoProductoService
  ) { }

  @Post('pedido-producto')
  async crearOActualizarPedido(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.crearOActualizarPedido(
      createPedidoDto.userId,
      createPedidoDto.productId,
      createPedidoDto.cantidad,
    );
  }

  @Get('pedido-pendiente/:userId/productos')
  async todosLosProductosPedidoPendientePorUsuario(@Param('userId') userId: string ): Promise<Pedido[]> {
    return this.pedidoService.todosLosProdustosPorPedido(userId);
  }

  @Get('pedido-finalizado/:userId/productos')
  async todosLosProductosPedidoFinalizadoPorUsuario(@Param('userId') userId: string ): Promise<Pedido[]> {
    return this.pedidoService.obtenerPedidoFinalizadoPorUsuario(userId);
  }

  @Get('pedido-pendiente/dato-pedido/:userId')
  async obtenerPedidoPendientePorUsuario(@Param('userId') userId: string): Promise<Pedido> {
    return this.pedidoService.burcarPedidoPorId(userId);
  }

  @Get('pedido-pendiente/comprar/:pedidoId')
  async pedidoProductoSeleccionado(@Param('pedidoId') pedidoId: string ): Promise<Pedido> {
    return this.pedidoProductoService.pedidoSeleccionado(pedidoId);
  }

  @Patch('pedido-confirmado/actualizar/:pedidoId')
  async actualizarPedidoConfirmado(@Param('pedidoId') pedidoId: string,
                                   tarjetaId: string,
                                   direccionId: string): Promise<Pedido> {
    return this.pedidoProductoService.confirmarCompra(pedidoId, tarjetaId, direccionId);
  }

  @Delete('pedido-pendiente/producto/delete/:pedidoProductos')
  async eliminar(@Param('pedidoProductos') pedidoProductos: string): Promise<void> {
    return this.pedidoService.eliminarProductoPedidoporId(pedidoProductos);
  }

  @Post('pedido-pendiente/update/:pedidoId/:pedidoProductoId/:productoId')
  async actualizarPedido(@Param('pedidoId') pedidoId: string, @Param('pedidoProductoId') pedidoProductoId, @Param('productoId') productoId) {
    return this.pedidoProductoService.actualizarCantidadPedidoProducto(pedidoId, pedidoProductoId, productoId);
  }

  @Post('pedido-pendiente/update/eliminar/:pedidoId/:pedidoProductoId/:productoId')
  async eliminarProducto(@Param('pedidoId') pedidoId: string, @Param('pedidoProductoId') pedidoProductoId, @Param('productoId') productoId) {
    return this.pedidoProductoService.actualizarEliminarCantidadPedidoProducto(pedidoId, pedidoProductoId, productoId);
  }

}
