import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Employee } from 'src/entities/Employee';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entities/Position';
import { Team } from 'src/entities/Team';
import { PagedDataQuery, PagedDataResult } from 'src/interface/tabular';
import { IndexEmployeeRequest, IndexEmployeeResponse } from './model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const pPosition = this.positionRepository.findOneBy({
      positionId: dto.position,
      isEnable: 1,
    });
    const pTeam = this.teamRepository.findOneBy({
      teamId: dto.team,
      isEnable: 1,
    });

    const orm: Employee = {
      employeeId: undefined!,
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      dateOfBirth: dto.dateOfBirth,
      position: await pPosition,
      team: await pTeam,
      isEnable: 1,
    };

    const result = await this.employeeRepository.save(orm);
    return result.employeeId;
  }

  async findAll(query: PagedDataQuery<IndexEmployeeRequest>) {
    const num = query.pageSize * query.pageIndex;

    const employeeList = await this.employeeRepository.find({
      take: query.pageSize,
      skip: num,
      where: {
        firstname: query.search.text,
        lastname: query.search.text,
        email: query.search.text,
        isEnable: 1,
      },
    });

    const result: PagedDataResult<IndexEmployeeResponse> = {
      data: employeeList.map<IndexEmployeeResponse>((item) => ({
        ...item,
      })),
      rowCount: employeeList.length,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
    };
    return result;
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({
      where: {
        employeeId: id,
        isEnable: 1,
      },
      loadRelationIds: true,
    });

    return employee || {};
  }

  async update(dto: UpdateEmployeeDto) {
    const pPosition = this.positionRepository.findOneBy({
      positionId: dto.position,
      isEnable: 1,
    });

    const pTeam = this.teamRepository.findOneBy({
      teamId: dto.team,
      isEnable: 1,
    });

    const orm = await this.employeeRepository.findOneBy({
      employeeId: dto.employeeId,
      isEnable: 1,
    });

    orm.firstname = dto.firstname;
    orm.lastname = dto.lastname;
    orm.email = dto.email;
    orm.dateOfBirth = dto.dateOfBirth;
    orm.position = await pPosition;
    orm.team = await pTeam;

    const result = await this.employeeRepository.save(orm);

    return result.employeeId;
  }

  async remove(employeeId: string) {
    const position = await this.employeeRepository.findOneBy({
      employeeId: employeeId,
      isEnable: 1,
    });

    position.isEnable = 0;
    const result = await this.employeeRepository.save(position);

    return result.employeeId;
  }
}
