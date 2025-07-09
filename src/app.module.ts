import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from './episodes/entities/episode.entity';

@Module({
  imports: [
    EpisodesModule,
    TopicsModule,
    ConfigModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'home',
      database: 'podcast',
      entities: [EpisodeEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
