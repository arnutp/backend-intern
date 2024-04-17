import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  description?: string | null;
}

export class DeleteTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  teamId: string;
}

export class UpdateTeamDto extends CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  teamId: string;
}
