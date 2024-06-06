import { PedidoProducto } from './../pedido-producto/entities/pedido-producto.entity';
import { PedidoProductoService } from './../pedido-producto/pedido-producto.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {

  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly pedidoProductoService: PedidoProductoService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
    ) { }

  async crearOActualizarPedido(userId: string, productId: string, cantidad: number): Promise<Pedido> {
    try {
      let pedido = await this.obtenerPedidoPendientePorUsuario(userId);
      if (!pedido) {
        pedido = await this.crearPedido({ userId, productId, cantidad }, userId);
        const pedidoId = pedido ? pedido.id : null;
        this.pedidoProductoService.crearPedidoProducto(pedidoId, productId, cantidad); 
      } else {
        const pedidoId = pedido ? pedido.id : null;
        this.pedidoProductoService.agregarProductoAPedido(pedidoId, productId, cantidad);
        return pedido;
      }
      return pedido;
    } catch (error) {
      throw new Error('Error al crear o actualizar el pedido.\n'+error);
    }
  }
  //* CREAR PEDIDO
  async crearPedido(createPedidoDto: CreatePedidoDto, userId: string): Promise<Pedido> {
    createPedidoDto.userId = userId;
    const pedido = this.pedidoRepository.create({
      ...createPedidoDto,
      user: { id: userId }
    })
    return this.pedidoRepository.save(pedido);
  }
  //* OBTENER PEDIDO PENDIENTE POR USUARIO
  async obtenerPedidoPendientePorUsuario(userId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ 
      where: { 
        user: { id: userId },
        estadoPedido: 'pendiente'
      } 
    });
    return pedido;
  }

  //* OBTENER PEDIDO FINALIZADO POR USUARIO
  async obtenerPedidoFinalizadoPorUsuario(userId: string): Promise<Pedido[]> {
    const pedido = await this.pedidoRepository.find({ 
      where: { 
        user: { id: userId },
        estadoPedido: 'finalizado'
      },
      relations: [
        'pedidoProductos',
        'pedidoProductos.producto'
      ]
    });
    return pedido;
  }

  //* OBTENER TODOS LOS PEDIDOS DEL USUARIO
  async todosLosProdustosPorPedido(userId: string): Promise<Pedido[]> {
    const pedido = await this.pedidoRepository.findOne({
      where: {
        user: { id: userId },
        estadoPedido: 'pendiente'
      },
      relations: [
        'pedidoProductos',
        'pedidoProductos.producto'
      ]
    });
    return pedido ? [pedido] : [];
  }

  async burcarPedidoPorId(userId: string): Promise<Pedido> {
    return await this.pedidoRepository.findOne({ 
      where: { 
        user: { id: userId },
        estadoPedido: 'pendiente'
      }
    });
  }

  async eliminarProductoPedidoporId(pedidoProductos: string): Promise<void> { 
    if (!pedidoProductos) {
      console.log('Error: El ID del producto es nulo.');
      return;
  }
    const pedidoEliminadoRepository = this.entityManager.getRepository(PedidoProducto);
    const pedidoEliminado = await pedidoEliminadoRepository.findOne({
      where: { id: pedidoProductos },
      relations: [
        'pedido',
        'producto'
      ]
     });
      pedidoEliminado.pedido.totalPedido -= pedidoEliminado.subTotal;
      pedidoEliminado.pedido.cantTotalProductos -= pedidoEliminado.cantidad;
      await this.pedidoRepository.save(pedidoEliminado.pedido);
    if (!pedidoEliminado) {
      console.log('Error: El ID del producto es indefinido o nulo.');
      return;
    }
    await pedidoEliminadoRepository.delete(pedidoProductos);
  }

  // async obtenerListaPedidoCompradoPorUsuario(userId: string): Promise<PedidoProducto[]> {
  //   return await this.pedidoRepository.find({
  //     where: { 
  //       user: { id: userId },
  //       estadoPedido: 'finalizado'
  //     }
  //   });
  // }

}
