import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './Employee';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  @Column('text', { primary: true, name: 'team_id', unique: true })
  teamId: string;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('integer', { name: 'is_enable', nullable: true })
  isEnable: number | null;

  @OneToMany(() => Employee, (employee) => employee.team)
  employees: Employee[];
}
