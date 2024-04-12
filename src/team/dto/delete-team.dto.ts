import { IsNotEmpty } from 'class-validator';

export class DeleteTeamDto {
  @IsNotEmpty()
  teamId: string;
}
