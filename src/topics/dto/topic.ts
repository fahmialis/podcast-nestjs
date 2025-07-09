import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TopicsPayloadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
