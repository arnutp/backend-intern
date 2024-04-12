import { Team } from 'src/entities/Team';

export interface IndexTeamRequest {
  text: string;
}

export interface IndexTeamResponse
  extends Pick<Team, 'teamId' | 'name' | 'description'> {}
