import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SuperheroesModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/superheroes'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
