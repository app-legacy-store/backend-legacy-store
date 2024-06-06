import { ProductoService } from './../producto/producto.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly productoService: ProductoService
  ) { }

  async findAllCategorias(): Promise<Categoria[]> {
    const categoriaRepository = this.entityManager.getRepository(Categoria);
    return await categoriaRepository.find();
  }

  async findOneCategoria(id: string | null): Promise<Categoria | null> {
    const categoriaRepository = this.entityManager.getRepository(Categoria)
    if (!id) {
      return null;
    }
    return await categoriaRepository.findOne({ where: { id } });
  }

  async createCategoria(createCategoriaDto: CreateCategoriaDto,
                        imagenProducto: Express.Multer.File,
                        imganeBanner: Express.Multer.File): Promise<Categoria> {
    const nuevaCategoria = new Categoria();
    nuevaCategoria.nombre = createCategoriaDto.nombre;
    nuevaCategoria.imagenProducto = createCategoriaDto.imagenProducto;
    nuevaCategoria.imagenBanner = createCategoriaDto.imagenBanner;

    if (imagenProducto) {nuevaCategoria.imagenProducto = await this.productoService.guardarImagen(imagenProducto);}
    if (imganeBanner) {nuevaCategoria.imagenBanner = await this.productoService.guardarImagen(imganeBanner);}
    
    const categoriaRepository = this.entityManager.getRepository(Categoria);
    return await categoriaRepository.save(nuevaCategoria);
  }

  async updateCategoria(id: string, 
                        updateCategoriaDto: UpdateCategoriaDto,
                        imagenProducto: Express.Multer.File,
                        imagenBanner: Express.Multer.File): Promise<Categoria> {
    const categoriaRepository = this.entityManager.getRepository(Categoria);
    const categoria = await categoriaRepository.findOne({ where:{ id } })

    if (!categoria) {
      throw new NotAcceptableException(`Categoria con ID ${id} no encontrado.`)
    }

    categoria.nombre = updateCategoriaDto.nombre || categoria.nombre;
    if (imagenProducto) {categoria.imagenProducto = await this.productoService.guardarImagen(imagenProducto);}
    if (imagenBanner) {categoria.imagenBanner = await this.productoService.guardarImagen(imagenBanner);}
    return await categoriaRepository.save(categoria);
  }

  async removeCategoria(id: string): Promise<void> {
    const categoriaRepository = this.entityManager.getRepository(Categoria);
    const categoria = await categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotAcceptableException(`Categoria con ID ${id} no encontrado`)
    }
    await categoriaRepository.remove(categoria);
  }
}
