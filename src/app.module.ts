import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { EpisodeEntity } from './episodes/entities/episode.entity';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicEntity } from './topics/entities/topic.entity';
import { TopicsModule } from './topics/topics.module';

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
      entities: [EpisodeEntity, TopicEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
