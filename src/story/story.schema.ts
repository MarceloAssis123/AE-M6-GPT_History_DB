import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'history' })
export class Story extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  content: string;
}

export const StorySchema = SchemaFactory.createForClass(Story);
