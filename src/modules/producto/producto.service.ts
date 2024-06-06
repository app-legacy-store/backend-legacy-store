import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { EntityManager, Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { promisify } from 'util';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Categoria } from '../categorias/entities/categoria.entity';
const writeFileAsync = promisify(fs.writeFile);


@Injectable()
export class ProductoService {

  constructor (
    private readonly entityManager: EntityManager,
    @InjectEntityManager()
    private readonly categoryRepository: Repository<Categoria>
  ) { }

  //TODO BUSCAR PRODUCTOS
  async findAllProductos(): Promise<Producto[]> {
    const productoRepository = this.entityManager.getRepository(Producto);
    return await productoRepository.find({ relations: ["categoria"] });
  }

  //TODO BUSCAR SOLO UN PRODUCTO
  async findOneProducto(id: string): Promise<Producto> {
    const productoRepository = this.entityManager.getRepository(Producto)
    return await productoRepository.findOne({ where: {id} });
  }

  //TODO CREAR UN PRODUCTO
  async createProducto(createProductoDto: CreateProductoDto,
                      imagen: Express.Multer.File): Promise<Producto> {
    const nuevoProducto = new Producto();

    nuevoProducto.nombre = createProductoDto.nombre;
    nuevoProducto.descripcion = createProductoDto.descripcion;
    nuevoProducto.precio = createProductoDto.precio;
    nuevoProducto.stock = createProductoDto.stock;
    nuevoProducto.categoria = createProductoDto.categoria;

    
    if (imagen) {
      nuevoProducto.imagen = await this.guardarImagen(imagen);
    }

    const productoRepository = this.entityManager.getRepository(Producto)
    return await productoRepository.save(nuevoProducto);
  }

  // TODO ACTUALIZAR STOCK DE UN PRODUCTO
  async updateCartProducto(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const productoRepository = this.entityManager.getRepository(Producto);
    const producto = await productoRepository.findOne({ where: { id } })

    if (!producto) {
      throw new NotAcceptableException(`Producto con ID ${id} no encontrado.`)
    }

    if (updateProductoDto.stock !== undefined && updateProductoDto.stock !== null) {
      producto.stock = updateProductoDto.stock;
    }
    
    return await productoRepository.save(producto);
  }

  //TODO MODIFICAR UN PRODUCTO
  async updateProducto(id: string, updateProductoDto: UpdateProductoDto, imagen: Express.Multer.File): Promise<Producto> {
    const productoRepository = this.entityManager.getRepository(Producto);
    const producto = await productoRepository.findOne({ where: { id } })

    if (!producto) {
      throw new NotAcceptableException(`Producto con ID ${id} no encontrado.`)
    }

    producto.nombre = updateProductoDto.nombre || producto.nombre;
    producto.descripcion = updateProductoDto.descripcion || producto.descripcion;
    producto.precio = updateProductoDto.precio || producto.precio;
    producto.stock = updateProductoDto.stock || producto.stock;
    producto.categoria = updateProductoDto.categoria || producto.categoria;

    if (imagen) {
      if (producto.imagen) {
        this.eliminarImagen(producto.imagen);
      }
      producto.imagen = await this.guardarImagen(imagen);
    }

    return await productoRepository.save(producto);
  }

  //TODO ELIMINAR UN PRODUCTO
  async removeProducto(id: string): Promise<void> {
    const productoRepository = this.entityManager.getRepository(Producto);
    const producto = await productoRepository.findOne({ where: { id } })
    if (!producto) {
      throw new NotAcceptableException(`Producto con ID ${id} no encontrado.`)
    } 
    await productoRepository.remove(producto); 
  }


  async guardarImagen(imagen: Express.Multer.File): Promise<string> {
    const rutaDestino = path.join(__dirname, '..', '..', '..', 'uploads');
    if (!fs.existsSync(rutaDestino)) {
      fs.mkdirSync(rutaDestino, { recursive: true });
    }
    const nombreArchivo = `${Date.now()}-${imagen.originalname}`;
    const rutaCompleta = path.join(rutaDestino, nombreArchivo);
    await writeFileAsync(rutaCompleta, imagen.buffer);
    return nombreArchivo;
  }

  async eliminarImagen(nombreArchivo: string): Promise<void> {
    const rutaCompleta = path.join(__dirname, '..', '..', '..', 'uploads', nombreArchivo);
    if (fs.existsSync(rutaCompleta)) {
      fs.unlinkSync(rutaCompleta);
    }
  }

  //TODO BUSCAR PRODUCTOS POR CATEGORIA
  async findByCategoria(categoria: string): Promise<Categoria[]> {
    const productoCategoriaRepository = this.entityManager.getRepository(Categoria);
    return await productoCategoriaRepository.find({ where: { id: categoria }, relations: ["productos"] });
  }

}
