import { ProductoService } from './../producto/producto.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoProducto } from './entities/pedido-producto.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Tarjeta } from '../tarjeta/entities/tarjeta.entity';
import { Direccion } from '../direccion/entities/direccion.entity';

@Injectable()
export class PedidoProductoService {
  constructor(
    @InjectRepository(PedidoProducto)
    private readonly pedidoProductoRepository: Repository<PedidoProducto>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Tarjeta)
    private readonly tarjetaRepository: Repository<Tarjeta>,
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
    private readonly productoService: ProductoService,
  ) { }

  // * CREAR PEDIDO JUNTO CON LA LISTA DE PRODUCTOS
  async crearPedidoProducto(pedidoId: string, productoId: string, cantidad: number): Promise<PedidoProducto> {
    const producto = await this.productoService.findOneProducto(productoId);
    const precioUnitario = producto.precio;
    const subTotal = precioUnitario * cantidad;
    const pedidoProducto =  this.pedidoProductoRepository.create({
      pedido: { id: pedidoId },
      producto: producto,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
      subTotal: subTotal
    });
    const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId } });
    pedido.cantTotalProductos += cantidad;
    pedido.totalPedido += subTotal;
    await this.pedidoRepository.save(pedido);
    return await this.pedidoProductoRepository.save(pedidoProducto);
  }

  // * AGREGAR PRODUCTO AL PEDIDO EXISTENTE
  async agregarProductoAPedido(pedidoId: string, productoId: string, cantidad: number): Promise<PedidoProducto> {
    const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId } });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    let pedidoProducto = await this.pedidoProductoRepository.findOne({ 
      where: { pedido: { id: pedidoId }, producto: { id: productoId } } 
    });
    
    if (pedidoProducto) {
      const subtotalAnterior = pedidoProducto.subTotal;
      pedidoProducto.cantidad += cantidad;
      pedidoProducto.subTotal = pedidoProducto.cantidad * pedidoProducto.precioUnitario;
      pedido.totalPedido -= subtotalAnterior;
    } else {
      pedidoProducto = await this.crearPedidoProducto(pedidoId, productoId, cantidad);
    }
    const subtotalProductoAgregado = pedidoProducto.subTotal;
    pedido.cantTotalProductos += cantidad;
    pedido.totalPedido += subtotalProductoAgregado;
    await this.pedidoRepository.save(pedido);
  
    return await this.pedidoProductoRepository.save(pedidoProducto);
  }

  async actualizarCantidadPedidoProducto(pedidoId: string, pedidoProductoId: string, productoId: string): Promise<PedidoProducto> {
    const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId } });
    const pedidoProducto = await this.pedidoProductoRepository.findOne({ where: { id: pedidoProductoId, producto: { id: productoId } } });

    if (!pedido || !pedidoProducto) {
      throw new NotFoundException('Pedido o el producto del pedido no encontrado'); 
    } else {
      const subtotalAnterior = pedidoProducto.subTotal;
      pedidoProducto.cantidad += 1;

      pedidoProducto.subTotal = pedidoProducto.cantidad * pedidoProducto.precioUnitario;
      pedido.totalPedido -= subtotalAnterior;
      pedido.totalPedido += pedidoProducto.subTotal;
      pedido.cantTotalProductos += 1;
      await this.pedidoRepository.save(pedido);
      return await this.pedidoProductoRepository.save(pedidoProducto);
    }
  }

  async actualizarEliminarCantidadPedidoProducto(pedidoId: string, pedidoProductoId: string, productoId: string): Promise<PedidoProducto> {
    const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId } });
    const pedidoProducto = await this.pedidoProductoRepository.findOne({ where: { id: pedidoProductoId, producto: { id: productoId } } });

    if (!pedido || !pedidoProducto) {
      throw new NotFoundException('Pedido o el producto del pedido no encontrado'); 
    } else if (pedidoProducto.cantidad != 1) {
      const subtotalAnterior = pedidoProducto.subTotal;
      pedidoProducto.cantidad -= 1;
      pedidoProducto.subTotal = pedidoProducto.cantidad * pedidoProducto.precioUnitario;
      pedido.totalPedido -= subtotalAnterior;
      pedido.totalPedido += pedidoProducto.subTotal;
      pedido.cantTotalProductos -= 1;
      await this.pedidoRepository.save(pedido);
      return await this.pedidoProductoRepository.save(pedidoProducto);
    }
  }

  async pedidoSeleccionado(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ 
      where: { id: pedidoId },
      relations: [
        'pedidoProductos',
        'pedidoProductos.producto'
      ]
    });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return await pedido;
  }

  async confirmarCompra (pedidoId: string, tarjetaId: string, direccionId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId } });
    const tarjeta = await this.tarjetaRepository.findOne({ where: { id: tarjetaId } });
    const direccion = await this.direccionRepository.findOne({ where: { id: direccionId } });
    if (!pedido) { throw new NotFoundException('Pedido no encontrado'); }
    if (!tarjeta) { throw new NotFoundException('Tarjeta no encontrada'); }
    if (!direccion) { throw new NotFoundException('Dirección no encontrada'); }

    pedido.estadoPedido = 'Enviado';
    pedido.tarjetaPago = tarjeta.id;
    pedido.direccionEnvio = direccion.id;

    return await this.pedidoRepository.save(pedido);
  }
  
}