import { Injectable } from '@nestjs/common';
import {
  CreateSuperheroeVm,
  Superheroe,
  UpdateSuperheroeVm,
} from './superheroes.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import superheroesList from './superheroes.json';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectModel(Superheroe.name) private superheroeModel: Model<Superheroe>,
  ) {}

  async getAll(): Promise<Superheroe[]> {
    return await this.superheroeModel.find().exec();
  }

  async getHeroById(id: string): Promise<Superheroe> {
    return await this.superheroeModel.findById(id).exec();
  }

  async delete(id: string): Promise<any> {
    await this.superheroeModel.deleteOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateSuperheroeVm: UpdateSuperheroeVm,
  ): Promise<Superheroe> {
    const existingSuperheroe = await this.superheroeModel.findByIdAndUpdate(
      id,
      updateSuperheroeVm,
      { new: true },
    );

    return existingSuperheroe;
  }

  async create(
    createSuperheroeVm: CreateSuperheroeVm,
    images: Express.Multer.File[],
  ): Promise<Superheroe> {
    const heroFolder = path.join('uploads', createSuperheroeVm.nickname);
    if (!fs.existsSync(heroFolder)) {
      fs.mkdirSync(heroFolder, { recursive: true });
    }

    for (const file of images) {
      const filePath = path.join(heroFolder, file.originalname);
      console.log(filePath);
      await fs.promises.writeFile(filePath, file.buffer);
    }

    const createdSuperheroe = new this.superheroeModel({
      id: generateStringId(),
      ...createSuperheroeVm,
      images: images.map((file) => path.join(heroFolder, file.originalname)),
    });

    const savedSuperheroe = await createdSuperheroe.save();

    return savedSuperheroe;
  }

  async seed(): Promise<any> {
    return await this.superheroeModel.insertMany(superheroesList);
  }
}

function generateStringId(): string {
  return Math.random().toString().substring(2);
}
