import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from './entities/episode.entity';

@Module({
  controllers: [EpisodesController],
  providers: [EpisodesService],
  imports: [ConfigModule, TypeOrmModule.forFeature([EpisodeEntity])],
})
export class EpisodesModule {}
