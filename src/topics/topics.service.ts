import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { TopicsPayloadDto } from './dto/topic';
import { TopicEntity } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {}

  async fetchTopics() {
    return await this.topicRepository.find();
  }
  async createTopic(body: TopicsPayloadDto) {
    try {
      const topic = this.topicRepository.create(body);
      return await this.topicRepository.save(topic);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as { code?: string };
        if (driverError?.code === 'ER_DUP_ENTRY') {
          throw new ConflictException(`Topic '${body.name}' already exists`);
        }
      }
      throw new InternalServerErrorException('Failed to create topic');
    }
  }

  async updateTopic(id: number, body: TopicsPayloadDto) {
    try {
      const oldTopic = await this.topicRepository.findOneBy({ id });
      const updatedTopic = { ...oldTopic, ...body };
      return this.topicRepository.update(id, updatedTopic);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
