import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'src/entities/Team';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagedDataQuery, PagedDataResult } from 'src/interface/tabular';
import { IndexTeamRequest, IndexTeamResponse } from './model';
import { DropdownModel } from 'src/interface/dropdown';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(dto: CreateTeamDto) {
    const result = await this.teamRepository.save({
      name: dto.name,
      description: dto.description || null,
      isEnable: 1,
    });
    return result.teamId;
  }

  async findAll(query: PagedDataQuery<IndexTeamRequest>) {
    const num = query.pageSize * query.pageIndex;

    const positionList = await this.teamRepository.find({
      take: query.pageSize,
      skip: num,
      where: {
        name: query.search.text,
        isEnable: 1,
      },
    });

    const result: PagedDataResult<IndexTeamResponse> = {
      data: positionList.map<IndexTeamResponse>((item) => ({
        name: item.name,
        teamId: item.teamId,
        description: item.description || null,
      })),
      rowCount: positionList.length,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
    };
    return result;
  }

  async findOne(id: string) {
    const team = await this.teamRepository.findOneBy({
      teamId: id,
      isEnable: 1,
    });

    return team || {};
  }

  async update(dto: UpdateTeamDto) {
    const team = await this.teamRepository.findOneBy({
      teamId: dto.teamId,
      isEnable: 1,
    });

    team.name = dto.name;
    team.description = team.description;

    const result = await this.teamRepository.save(team);

    return result.teamId;
  }

  async remove(id: string) {
    const team = await this.teamRepository.findOneBy({
      teamId: id,
      isEnable: 1,
    });

    team.isEnable = 0;
    const result = await this.teamRepository.save(team);

    return result.teamId;
  }

  async getDropdown() {
    const teamList = await this.teamRepository.findBy({
      isEnable: 1,
    });

    return teamList.map<DropdownModel>((item) => ({
      text: item.name,
      value: item.teamId,
    }));
  }
}
