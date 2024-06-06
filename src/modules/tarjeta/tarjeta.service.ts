import { Injectable } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TarjetaService {

  constructor(
    @InjectRepository(Tarjeta)
    private readonly tarjetaRepository: Repository<Tarjeta>,
    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) { }

  async create(createTarjetaDto: CreateTarjetaDto, userId: string): Promise<Tarjeta> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
    const newTarjeta = new Tarjeta();
    newTarjeta.nombreTarjeta = createTarjetaDto.nombreTarjeta;
    newTarjeta.numeroTarjeta = createTarjetaDto.numeroTarjeta;
    newTarjeta.fechaVencimiento = createTarjetaDto.fechaVencimiento;
    newTarjeta.cvc = createTarjetaDto.cvc;
    newTarjeta.user = usuario;
    
    return await this.tarjetaRepository.save(newTarjeta);
  }

  async findAll(): Promise<Tarjeta[]> {
    return await this.tarjetaRepository.find();
  }

  async buscarTarjetasUsuario(userId: string): Promise<Tarjeta[]> {
    const usuarioTarjetas = await this.usuarioRepository.findOne({ 
      where: { id: userId },
      relations: ['tarjetas'] 
    });
    return usuarioTarjetas.tarjetas;
  }

  async remove(id: string): Promise<void> {
    await this.tarjetaRepository.delete(id);
  }
}
