import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './Team';
import { Position } from './Position';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  @Column('text', { primary: true, name: 'employee_id', unique: true })
  employeeId: string;

  @Column('text', { name: 'firstname' })
  firstname: string;

  @Column('text', { name: 'lastname' })
  lastname: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'gender', nullable: true })
  gender: string | null;

  @Column('integer', { name: 'is_enable', nullable: true })
  isEnable: number | null;

  @ManyToOne(() => Team, (team) => team.employees)
  @JoinColumn([{ name: 'team_id', referencedColumnName: 'teamId' }])
  team: Team;

  @ManyToOne(() => Position, (position) => position.employees)
  @JoinColumn([{ name: 'position_id', referencedColumnName: 'positionId' }])
  position: Position;
}
