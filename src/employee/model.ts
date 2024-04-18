import { OmitType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Employee } from 'src/entities/Employee';

export class IndexEmployeeRequest {
  @ApiPropertyOptional()
  text?: string | null;

  @ApiPropertyOptional()
  team?: string | null;

  @ApiPropertyOptional()
  position?: string | null;
}

export class IndexEmployeeResponse extends OmitType(Employee, [
  'isEnable',
  'position',
  'team',
]) {
  positionId: string;
  teamId: string;
}
