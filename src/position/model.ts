import { ApiPropertyOptional } from '@nestjs/swagger';
import { Position } from 'src/entities/Position';

export class IndexPositionRequest {
  @ApiPropertyOptional()
  text: string;
}

export interface IndexPositionResponse
  extends Pick<Position, 'positionId' | 'name' | 'description'> {}
