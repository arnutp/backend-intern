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

export interface IndexEmployeeResponse extends Omit<Employee, 'isEnable'> {}
