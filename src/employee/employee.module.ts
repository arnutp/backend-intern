import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entities/Employee';
import { Team } from 'src/entities/Team';
import { Position } from 'src/entities/Position';
import { Phone } from 'src/entities/Phone';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Team, Position, Phone])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
