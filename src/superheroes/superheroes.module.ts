import { Module } from '@nestjs/common';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Superheroe, SuperheroeSchema } from './superheroes.schema';
import { SuperheroeSeed } from './superheroes.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Superheroe.name, schema: SuperheroeSchema },
    ]),
  ],
  controllers: [SuperheroesController],
  providers: [SuperheroesService, SuperheroeSeed],
})
export class SuperheroesModule {}
