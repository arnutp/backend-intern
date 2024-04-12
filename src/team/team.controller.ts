import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DeleteTeamDto } from './dto/delete-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('/create')
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get('/index')
  findAll() {
    return this.teamService.findAll();
  }

  @Get('/getDetail')
  findOne(@Query('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post('/update')
  update(@Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(updateTeamDto);
  }

  @Post('/delete')
  remove(@Body() deleteTeamDto: DeleteTeamDto) {
    return this.teamService.remove(deleteTeamDto.teamId);
  }
}
