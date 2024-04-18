import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, GetDetailEmployee, UpdateEmployeeDto } from './dto';
import { Employee } from 'src/entities/Employee';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entities/Position';
import { Team } from 'src/entities/Team';
import { PagedDataQuery, PagedDataResult } from 'src/interface/tabular';
import { IndexEmployeeRequest, IndexEmployeeResponse } from './model';
import { Phone } from 'src/entities/Phone';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const position = await this.positionRepository.findOneBy({
      positionId: dto.position,
      isEnable: 1,
    });
    const team = await this.teamRepository.findOneBy({
      teamId: dto.team,
      isEnable: 1,
    });

    const orm: Employee = {
      employeeId: undefined!,
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      dateOfBirth: dto.dateOfBirth,
      position: position,
      team: team,
      phones: [],
      isEnable: 1,
    };

    const result = await this.employeeRepository.save(orm);

    dto.phones.forEach(async (item) => {
      await this.phoneRepository.save({
        employee: result,
        phoneNumber: item.phoneNumber,
      });
    });

    return result.employeeId;
  }

  async findAll(query: PagedDataQuery<IndexEmployeeRequest>) {
    const num = query.pageSize * query.pageIndex;

    const _text = query.search.text
      ? ILike(`%${query.search.text}%`)
      : undefined;

    const and: FindOptionsWhere<Employee> = {
      isEnable: 1,
      team: {
        teamId: query.search.team,
      },
      position: {
        positionId: query.search.position,
      },
    };
    if (query.search.text) {
    }
    const employeeList = await this.employeeRepository.find({
      take: query.pageSize,
      skip: num,
      where: [
        {
          firstname: _text,
          ...and,
        },
        {
          lastname: _text,
          ...and,
        },
        {
          email: _text,
          ...and,
        },
      ],
      relations: ['team', 'position', 'phones'],
    });

    const result: PagedDataResult<IndexEmployeeResponse> = {
      data: employeeList.map<IndexEmployeeResponse>((item) => {
        const { position, team, ...em } = item;

        return {
          ...em,
          positionId: position.positionId,
          teamId: team.teamId,
        };
      }),
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
      relations: ['team', 'position', 'phones'],
    });

    const { team, position, phones, ..._emp } = employee;
    const model: GetDetailEmployee = {
      ..._emp,
      phones: phones,
      teamId: team.teamId,
      positionId: position.positionId,
    };

    return model || {};
  }

  async update(dto: UpdateEmployeeDto) {
    const position = await this.positionRepository.findOneBy({
      positionId: dto.position,
      isEnable: 1,
    });

    const team = await this.teamRepository.findOneBy({
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
    orm.position = position;
    orm.team = team;

    const result = await this.employeeRepository.save(orm);

    const phones = await this.phoneRepository.findBy({ employee: orm });
    await this.phoneRepository.remove(phones);

    dto.phones.forEach(async (item) => {
      await this.phoneRepository.save({
        employee: result,
        phoneNumber: item.phoneNumber,
      });
    });

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
