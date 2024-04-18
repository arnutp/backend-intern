import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/entities/Employee';

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

  @ApiProperty()
  phones: PhoneModel[];
}

export class UpdateEmployeeDto extends CreateEmployeeDto {
  @ApiProperty()
  employeeId: string;
}
export class PhoneModel {
  @ApiProperty()
  phoneId: string;

  @ApiProperty()
  phoneNumber: string;
}

export class DeleteEmployeeDto {
  @ApiProperty()
  employeeId: string;
}

export class GetDetailEmployee extends OmitType(Employee, [
  'team',
  'position',
  'phones',
]) {
  phones: PhoneModel[];
  positionId: string;
  teamId: string;
}
