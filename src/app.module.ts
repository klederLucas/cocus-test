import { Module } from '@nestjs/common';
import { GithubModule } from './modules/github/github.modules';
import { GithubController } from './modules/github/github.controller';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import configuration from './shared/configuration';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    GithubModule,
  ],
  controllers: [GithubController],
  providers: [],
})
export class AppModule {}
