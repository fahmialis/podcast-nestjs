import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(newEpisode: Episode) {
    const episode = await this.episodeRepository.findOneBy({
      id: newEpisode.id,
    });

    if (episode) {
      const updatedEpisode = { ...episode, ...newEpisode };

      return this.episodeRepository.save(updatedEpisode);
    }

    throw new NotFoundException('Episode not found');
  }

  async findOne(id: number) {
    const episode = await this.episodeRepository.findOne({ where: { id } });

    return episode;
  }
}
