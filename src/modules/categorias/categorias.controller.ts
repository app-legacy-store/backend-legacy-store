import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('categoria')
export class CategoriasController {
  constructor(
    private readonly categoriasService: CategoriasService
    ) { }
  
  @Get()
  async findAll(): Promise<Categoria[]> {
    return await this.categoriasService.findAllCategorias();
  }

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenBanner', maxCount: 1 }
  ]))
  async create(@Body() createCategoriaDto: CreateCategoriaDto,
               @UploadedFiles() files:{ imagenProducto?: Express.Multer.File, imagenBanner?: Express.Multer.File  }): Promise<Categoria> {
      const imagenProducto = files.imagenProducto ? files.imagenProducto[0] : null;
      const imagenBanner = files.imagenBanner ? files.imagenBanner[0] : null;
    return await this.categoriasService.createCategoria(createCategoriaDto, imagenProducto, imagenBanner);
  }

  @Get(':id?')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOneCategoria(id || null);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([ 
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenBanner', maxCount: 1 }
  ]))
  update(@Param('id') id: string, 
         @Body() updateCategoriaDto: UpdateCategoriaDto,
         @UploadedFiles() files:{ imagenProducto?: Express.Multer.File, imagenBanner?: Express.Multer.File }){
      const imagenProducto = files.imagenProducto ? files.imagenProducto[0] : null;
      const imagenBanner = files.imagenBanner ? files.imagenBanner[0] : null;
      console.log(imagenProducto, imagenBanner);
    return this.categoriasService.updateCategoria(id, updateCategoriaDto, imagenProducto, imagenBanner);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.removeCategoria(id);
  }
}
