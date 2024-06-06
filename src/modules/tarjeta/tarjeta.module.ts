import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { TarjetaController } from './tarjeta.controller';
import { Tarjeta } from './entities/tarjeta.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarjeta]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TarjetaController],
  providers: [TarjetaService],
})
export class TarjetaModule {}
