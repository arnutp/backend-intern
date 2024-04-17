import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  team: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {
  @ApiProperty()
  employeeId: string;
}

export class DeleteEmployeeDto {
  @ApiProperty()
  employeeId: string;
}

export class GetDetailEmployee {
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  positionId: string;
  teamId: string;
}
