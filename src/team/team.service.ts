import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'src/entities/Team';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(team: CreateTeamDto) {
    const result = await this.teamRepository.save({
      name: team.name,
      isEnable: 1,
    });
    return result.teamId;
  }

  async findAll(text?: string) {
    const team = await this.teamRepository.findBy({
      name: text,
      isEnable: 1,
    });

    return team;
  }

  async findOne(teamId: string) {
    const team = await this.teamRepository.findOneBy({
      teamId: teamId,
    });
    return team;
  }

  async update(updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.findOneBy({
      teamId: updateTeamDto.teamId,
    });
    team.name = updateTeamDto.name;
    const result = await this.teamRepository.save(team);

    return result.teamId;
  }

  async remove(teamId: string) {
    const team = await this.teamRepository.findOneBy({
      teamId: teamId,
    });
    team.isEnable = 0;
    const result = await this.teamRepository.save(team);

    return result.teamId;
  }
}
