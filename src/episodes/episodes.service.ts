import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll() {
    return this.episodes;
  }

  create(episode: Episode) {
    this.episodes.push(episode);
  }

  findOne(id: number) {
    const episode = this.episodes.find((episode) => episode.id === id);
    return episode;
  }
}
