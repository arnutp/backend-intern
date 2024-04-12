export class CreateEmployeeDto {
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  position: string;
  team: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {
  employeeId: string;
}

export class DeleteEmployeeDto {
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
