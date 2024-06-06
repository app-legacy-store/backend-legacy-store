// import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
// import { UsuarioService } from './usuario.service';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';
// import { Usuario } from './entities/usuario.entity';

// @Controller('usuario')
// export class UsuarioController {
//   constructor(private readonly usuarioService: UsuarioService) {}

//   @Get()
//   async findAll(): Promise<Usuario[]> {
//     return await this.usuarioService.findAllUsuarios();
//   }

//   @Post('create')
//   async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
//     return await this.usuarioService.createUsuario(createUsuarioDto);
//   }

//   @Get(':id')
//   async findOneUser(@Param('id') id: string) {
//     return this.usuarioService.findOneUsuario(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, 
//          @Body() updateUsuarioDto: UpdateUsuarioDto) {
//     return this.usuarioService.updateUsuario(id, updateUsuarioDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usuarioService.removeUsuario(id);
//   }
// }
