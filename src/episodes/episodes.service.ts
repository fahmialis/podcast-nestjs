import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpisodeDto } from './dto/create';
import { EpisodeEntity } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(EpisodeEntity)
    private episodeRepository: Repository<EpisodeEntity>,
  ) {}

  async findAll() {
    return await this.episodeRepository.find();
  }

  create(episode: CreateEpisodeDto) {
    const newEpisode = this.episodeRepository.create({
      ...episode,
    });

    return this.episodeRepository.save(newEpisode);
  }

  async update(newEpisode: CreateEpisodeDto, id: number) {
    const episode = await this.episodeRepository.findOneBy({
      id,
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
