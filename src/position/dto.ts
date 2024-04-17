import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  description?: string | null;
}

export class DeletePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  positionId: string;
}

export class UpdatePositionDto extends CreatePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  positionId: string;
}
