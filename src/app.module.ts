import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI_MONGO_DB, {

    }),
    ConfigModule.forRoot({
      isGlobal: true,  // Torna as configurações acessíveis em todos os módulos
    }),
    UserModule, StoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
