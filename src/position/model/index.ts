import { Position } from 'src/entities/Position';

export interface IndexPositionRequest {
  text: string;
}

export interface IndexPositionResponse
  extends Pick<Position, 'positionId' | 'name'> {}
