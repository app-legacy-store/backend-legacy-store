import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductoService } from '../producto/producto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria]),
    AuthModule
  ],
  controllers: [CategoriasController],
  providers: [
    CategoriasService,
    ProductoService
  ],
})
export class CategoriasModule {}
