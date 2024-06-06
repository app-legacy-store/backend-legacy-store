   // import { Injectable, NotFoundException } from '@nestjs/common';
   // import { CreateUsuarioDto } from './dto/create-usuario.dto';
   // import { UpdateUsuarioDto } from './dto/update-usuario.dto';
   // import { InjectEntityManager } from '@nestjs/typeorm';
   // import { EntityManager } from 'typeorm';
   // import { Usuario } from './entities/usuario.entity';

   // @Injectable()
   // export class UsuarioService {
   //   constructor(
   //     @InjectEntityManager()
   //     private readonly entityManager: EntityManager
   //   ) { }
   
   //   async findAllUsuarios(): Promise<Usuario[]> {
   //     const usuarioRepository = this.entityManager.getRepository(Usuario);
   //     return await usuarioRepository.find();
   //   }

   //   async findOneUsuario(id: string): Promise<Usuario | undefined> {
   //     const usuarioRepository = this.entityManager.getRepository(Usuario);
   //     return await usuarioRepository.findOne({ where: { id } }); 
   //   }

   //   async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
   //     const nuevoUsuario = new Usuario();
   //     nuevoUsuario.nombre = createUsuarioDto.nombre;
   //     nuevoUsuario.apellidoPaterno = createUsuarioDto.apellidoPaterno;
   //     nuevoUsuario.apellidoMaterno = createUsuarioDto.apellidoMaterno;
   //     nuevoUsuario.email = createUsuarioDto.email;
   //     nuevoUsuario.password = createUsuarioDto.password;
   //     nuevoUsuario.terminos = createUsuarioDto.terminos;

   //     const usuarioRepository = this.entityManager.getRepository(Usuario);
   //     return await usuarioRepository.save(nuevoUsuario);
   //   }  
   
   //   async updateUsuario(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
   //     const usuarioRepository = this.entityManager.getRepository(Usuario);
   //     const usuario = await usuarioRepository.findOne({ where: { id } });
   //     if (!usuario) {
   //       throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
   //     }

   //     usuario.nombre = updateUsuarioDto.nombre || usuario.nombre;
   //     usuario.apellidoPaterno = updateUsuarioDto.apellidoPaterno || usuario.apellidoPaterno;
   //     usuario.apellidoMaterno = updateUsuarioDto.apellidoMaterno || usuario.apellidoMaterno;
   //     usuario.email = updateUsuarioDto.email || usuario.email;
   //     usuario.password = updateUsuarioDto.password || usuario.password;

   //     return await usuarioRepository.save(usuario);
   //   }

   //   async removeUsuario(id: string): Promise<void> {
   //     const usuarioRepository = this.entityManager.getRepository(Usuario);
   //     const usuario = await usuarioRepository.findOne({ where: { id } });
   //     if (!usuario) {
   //       throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
   //     }

   //     await usuarioRepository.remove(usuario);
   //   }
   // }
