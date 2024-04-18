import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { PositionModule } from './position/position.module';
import { TeamModule } from './team/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/Employee';
import { Position } from './entities/Position';
import { Team } from './entities/Team';
import { Phone } from './entities/Phone';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.sqlite',
      entities: [Employee, Position, Team, Phone],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    EmployeeModule,
    TeamModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
