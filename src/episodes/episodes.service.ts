import { Injectable } from '@nestjs/common';
import { Episode } from './entities/episode';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeEntity } from './entities/episode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(EpisodeEntity)
    private episodeRepository: Repository<EpisodeEntity>,
  ) {}

  async findAll() {
    return await this.episodeRepository.find();
  }

  create(episode: Episode) {
    const newEpisode = this.episodeRepository.create({
      ...episode,
    });

    return this.episodeRepository.save(newEpisode);
  }

  async findOne(id: number) {
    const episode = await this.episodeRepository.findOne({ where: { id } });

    return episode;
  }
}
