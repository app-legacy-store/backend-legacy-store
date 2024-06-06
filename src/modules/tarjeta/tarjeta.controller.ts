import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';

@Controller('tarjeta')
export class TarjetaController {
  constructor(private readonly tarjetaService: TarjetaService) {}

  @Post('crear-tarjeta/:userId')
  async create(@Body() createTarjetaDto: CreateTarjetaDto,
              @Param('userId') userId: string ): Promise<Tarjeta> {
    return await this.tarjetaService.create(createTarjetaDto, userId);
  }

  @Get('lista-tarjetas')
  async findAll(): Promise<Tarjeta[]> {
    return await this.tarjetaService.findAll();
  }

  @Get('buscar-tarjetas-usuario/:userId')
  async buscarTarjetasUsuario(@Param('userId') userId: string): Promise<Tarjeta[]> {
    return await this.tarjetaService.buscarTarjetasUsuario(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTarjetaDto: UpdateTarjetaDto) {
  //   return this.tarjetaService.update(+id, updateTarjetaDto);
  // }

  @Delete('eliminar/:id')
  remove(@Param('id') id: string) {
    return this.tarjetaService.remove(id);
  }
}
