 import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { DireccionModule } from './modules/direccion/direccion.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { PedidoProductoModule } from './modules/pedido-producto/pedido-producto.module';
import { ProductoModule } from './modules/producto/producto.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './modules/banner/banner.module';
import { TarjetaModule } from './modules/tarjeta/tarjeta.module';

@Module({
  imports: [   
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.NAME_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      autoLoadEntities: true,
      synchronize: true
    }),
    DireccionModule,
    PedidosModule,
    PedidoProductoModule,
    ProductoModule,
    CategoriasModule,
    AuthModule,
    BannerModule,
    TarjetaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
