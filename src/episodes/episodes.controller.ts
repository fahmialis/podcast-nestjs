import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { TokenGuard } from 'src/guards/token.guard';
import { CreateEpisodeDto } from './dto/create';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
@UseGuards(TokenGuard)
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Post()
  create(@Body() body: CreateEpisodeDto) {
    const episode = {
      ...body,
      id: this.episodesService.findAll().length + 1,
    };

    this.episodesService.create(episode);

    return {
      message: 'Episode created successfully',
      data: episode,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const episode = this.episodesService.findOne(id);

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return {
      message: 'Episode found',
      data: episode,
    };
  }
}
