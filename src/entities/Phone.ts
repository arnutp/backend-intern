import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './Employee';

@Entity('phone')
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  @Column('text', {
    primary: true,
    name: 'phone_id',
    nullable: true,
    unique: true,
  })
  phoneId: string | null;

  @Column('text', { name: 'phone_number' })
  phoneNumber: string;

  @ManyToOne(() => Employee, (employee) => employee.phones)
  @JoinColumn([{ name: 'employee_id', referencedColumnName: 'employeeId' }])
  employee: Employee;
}
