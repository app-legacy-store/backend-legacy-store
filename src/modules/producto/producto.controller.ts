import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Categoria } from '../categorias/entities/categoria.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async findAll(): Promise<Producto[]> {
    return await this.productoService.findAllProductos();
  }

  @Get('categorias/:categoria')
  async findByCategoria(@Param('categoria') categoria: string): Promise<Categoria[]> {
    return await this.productoService.findByCategoria(categoria);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('imagen'))
  async create(@Body() createProductoDto: CreateProductoDto, 
               @UploadedFile() imagen: Express.Multer.File): Promise<Producto> {
    return await this.productoService.createProducto(createProductoDto, imagen);
  }
    
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Producto> {
    return this.productoService.findOneProducto(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  update(@Param('id') id: string, 
         @Body() updateProductoDto: UpdateProductoDto,
         @UploadedFile() imagen: Express.Multer.File): Promise<Producto> {
    return this.productoService.updateProducto(id, updateProductoDto, imagen);
  }

  @Delete(':id')
   remove(@Param('id') id: string) {
    return this.productoService.removeProducto(id);
  }
}
