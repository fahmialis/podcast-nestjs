import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
// import { TokenGuard } from 'src/guards/token.guard';
import { CreateEpisodeDto } from './dto/create';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
// @UseGuards(TokenGuard)
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Post()
  async create(@Body() body: CreateEpisodeDto) {
    await this.episodesService.create(body);

    return {
      message: 'Episode created successfully',
      data: body,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const episode = await this.episodesService.findOne(id);

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return {
      message: 'Episode found',
      data: episode,
    };
  }
}
