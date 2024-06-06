import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Delete, Param } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Banner } from './entities/banner.entity';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get('allBanners')
  async findAll(): Promise<Banner[]> {
    return await this.bannerService.findAll();
  }

  @Get('oneBanner/:id')
  async findOne(@Param('id') id: string): Promise<Banner> {
    return await this.bannerService.findOne(id);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('imagen'))
  create(@Body() createBannerDto: CreateBannerDto,
         @UploadedFile() imagen: Express.Multer.File): Promise<Banner>{
    return this.bannerService.create(createBannerDto, imagen);
  }

  @Delete('delete/:id')
  deleteBanner(@Param('id') id: string): Promise<void> {
    return this.bannerService.deleteBanner(id);
  }

}
