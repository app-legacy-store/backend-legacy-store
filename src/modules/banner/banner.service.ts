import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { Banner } from './entities/banner.entity';
import { ProductoService } from '../producto/producto.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class BannerService {

  constructor(
    private readonly entityManager: EntityManager,
    private productoService: ProductoService
  ) { }

  async findAll(): Promise<Banner[]> {
    const bannerRepository = this.entityManager.getRepository(Banner);
    return await bannerRepository.find();
  }

  async findOne(id: string): Promise<Banner> {
    const bannerRepository = this.entityManager.getRepository(Banner);
    return await bannerRepository.findOne({ where: { id } });
  }

  async deleteBanner(id: string): Promise<void> {
    const bannerRepository = this.entityManager.getRepository(Banner);
    await bannerRepository.delete(id);
  }

  async create(createBannerDto: CreateBannerDto, imagen: Express.Multer.File): Promise<Banner> {
    const nuevoBanner = new Banner();
    nuevoBanner.nombre = createBannerDto.nombre;
    nuevoBanner.descripcion = createBannerDto.descripcion;
    
    if (imagen) {
      nuevoBanner.imagen = await this.productoService.guardarImagen(imagen);
    }

    const bannerRepository = this.entityManager.getRepository(Banner)
    return await bannerRepository.save(nuevoBanner);
  }


}
