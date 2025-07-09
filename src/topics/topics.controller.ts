import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TopicsPayloadDto } from './dto/topic';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Get()
  fetchTopics() {
    return this.topicsService.fetchTopics();
  }

  @Post()
  async createTopic(@Body() body: TopicsPayloadDto) {
    await this.topicsService.createTopic(body);

    return {
      message: 'Topic created successfully',
      data: body,
    };
  }

  @Put(':id')
  async updateTopic(@Param('id') id: number, @Body() body: TopicsPayloadDto) {
    await this.topicsService.updateTopic(id, body);

    return {
      message: 'Topic updated successfully',
      data: body,
    };
  }
}
