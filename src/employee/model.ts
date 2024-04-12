import { Employee } from 'src/entities/Employee';

export interface IndexEmployeeRequest {
  text: string;
}

export interface IndexEmployeeResponse extends Omit<Employee, 'isEnable'> {}
