import { CreateTeamDto } from './create-team.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTeamDto extends CreateTeamDto {
  @IsNotEmpty()
  teamId: string;
}
