import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { Direccion } from './entities/direccion.entity';

@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  @Post('crear/:usuarioId')
  async create(
    @Body() createDireccionDto: CreateDireccionDto,
    @Param('usuarioId') usuarioId: string
  ): Promise<Direccion> {
    return await this.direccionService.create(createDireccionDto, usuarioId);
  }

  @Get()
  async findAll(): Promise<Direccion[]> {
    return await this.direccionService.findAll();
  }

  @Get('usuario/:userId')
  findOne(@Param('userId')  userId: string) {
    return this.direccionService.buscarDireccionesUsuario(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDireccionDto: UpdateDireccionDto) {
  //   return this.direccionService.update(id, updateDireccionDto);
  // }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.direccionService.eliminarDireccionUusario(id);
  }
}
