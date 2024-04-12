import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './Employee';

@Entity('position')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  @Column('text', { primary: true, name: 'position_id', unique: true })
  positionId: string;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('integer', { name: 'is_enable', nullable: true })
  isEnable: number | null;

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];
}
