import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Body,
  Patch,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import {
  CreateSuperheroeVm,
  Superheroe,
  UpdateSuperheroeVm,
} from './superheroes.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Get('get-all')
  getAll(): Promise<Superheroe[]> {
    return this.superheroesService.getAll();
  }

  @Get('get-one/:id')
  getHeroById(@Param('id') id: string): Promise<Superheroe> {
    return this.superheroesService.getHeroById(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<any> {
    return this.superheroesService.delete(id);
  }

  @Delete('delete-image/:id/:fileName')
  deleteImage(
    @Param('id') id: string,
    @Param('fileName') fileName: string,
  ): Promise<void> {
    return this.superheroesService.deleteImage(id, fileName);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateSuperheroeVm: UpdateSuperheroeVm,
  ): Promise<Superheroe> {
    return this.superheroesService.update(id, updateSuperheroeVm);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @Body() createSuperheroeVm: CreateSuperheroeVm,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<Superheroe> {
    const createdSuperheroe = await this.superheroesService.create(
      createSuperheroeVm,
      images,
    );

    return createdSuperheroe;
  }

  @Post('create-image/:heroId')
  @UseInterceptors(FileInterceptor('image'))
  async createImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('heroId') heroId: string,
  ): Promise<string> {
    return this.superheroesService.createImage(image, heroId);
  }
}
