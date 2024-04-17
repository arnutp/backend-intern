import { ApiPropertyOptional } from '@nestjs/swagger';
import { Team } from 'src/entities/Team';

export class IndexTeamRequest {
  @ApiPropertyOptional()
  text: string;
}

export interface IndexTeamResponse
  extends Pick<Team, 'teamId' | 'name' | 'description'> {}
