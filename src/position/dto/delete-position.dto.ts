import { IsNotEmpty } from 'class-validator';

export class DeletePositionDto {
  @IsNotEmpty()
  positionId: string;
}
