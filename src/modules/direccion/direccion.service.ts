import { Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class DireccionService {

  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) { }

  async create(createDireccionDto: CreateDireccionDto, userId: string):  Promise<Direccion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
    if(!usuario) { throw new Error('Usuario no encontrado'); }
    const newDireccion = new Direccion();

    newDireccion.calle = createDireccionDto.calle;
    newDireccion.codigoPostal = createDireccionDto.codigoPostal;
    newDireccion.numeroCasa = createDireccionDto.numeroCasa;
    newDireccion.colonia = createDireccionDto.colonia;
    newDireccion.ciudad = createDireccionDto.ciudad;
    newDireccion.estado = createDireccionDto.estado;
    newDireccion.user = usuario;

    return this.direccionRepository.save(newDireccion);
  }

  async findAll(): Promise<Direccion[]> {
    return await this.direccionRepository.find(
      { relations: ['user'] }
    );
  }

  async buscarDireccionesUsuario(userId: string): Promise<Direccion[]> {
    const usuario = await this.usuarioRepository.findOne({ 
      where: { id: userId }, 
      relations: ['direcciones'] 
    });
    if(!usuario) { throw new Error('Usuario no encontrado'); }
    return await usuario.direcciones;
  }

  async eliminarDireccionUusario(direccionId: string): Promise<void> {
    const direccion = await this.direccionRepository.findOne({ where: { id: direccionId } });
    if(!direccion) { throw new Error('Direccion no encontrada'); }
    await this.direccionRepository.delete({ id: direccionId });
  }

  // update(id: number, updateDireccionDto: UpdateDireccionDto) {
  //   return `This action updates a #${id} direccion`;
  // }

}
