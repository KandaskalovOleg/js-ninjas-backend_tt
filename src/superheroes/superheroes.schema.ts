import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SuperheroeDocument = HydratedDocument<Superheroe>;

@Schema()
export class Superheroe {
  @Prop()
  id: string;

  @Prop()
  nickname: string;

  @Prop()
  real_name: string;

  @Prop()
  origin_description: string;

  @Prop()
  superpowers: string;

  @Prop()
  catch_phrase: string;

  @Prop([String])
  images: string[];
}

export const SuperheroeSchema = SchemaFactory.createForClass(Superheroe);

export class CreateSuperheroeVm {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: Array<Express.Multer.File>;
}

export class UpdateSuperheroeVm {
  real_name?: string;
  origin_description?: string;
  superpowers?: string;
  catch_phrase?: string;
}
