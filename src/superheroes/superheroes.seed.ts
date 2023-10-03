import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';

@Injectable()
export class SuperheroeSeed {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Command({
    command: 'create:superheroes',
    describe: 'create a superheroes',
    // autoExit: true,
  })
  async create() {
    await this.superheroesService.seed();
  }
}
