// import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreatePositionDto } from './create-position.dto';

export class UpdatePositionDto extends CreatePositionDto {
  @IsNotEmpty()
  positionId: string;
}
