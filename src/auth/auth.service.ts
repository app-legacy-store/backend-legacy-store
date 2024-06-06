import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import  * as bcrypt from 'bcrypt'; 
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService
  ){ }

  async getAllUser(): Promise<User[]>{
    const userRepository = this.entityManager.getRepository(User);
    return await userRepository.find();
  }

  async findOneUser(id: string): Promise<User>{
    const userRepository = this.entityManager.getRepository(User);
    return await userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    try{
      const { password, ...userData } = createUserDto;
      const user =  this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user );
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {
      console.log(error);    
    }
  }

  async removeUser(id: string): Promise<void>{
    const userRepository = this.entityManager.getRepository(User);
    const user = await userRepository.findOne({ where: {id} });
    if (!user) {
      throw new NotFoundException(`User con ID ${id} no encontrado`)
    }
    await userRepository.remove(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where:{ email },
      select: { email: true, password: true, id: true } 
      })

      if (!user) {
        throw new UnauthorizedException('Credencial invalido (email)')
      }
      if (!bcrypt.compareSync ( password, user.password ) ) {
        throw new UnauthorizedException('Credencial invalido (password)')
      }
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }
}
