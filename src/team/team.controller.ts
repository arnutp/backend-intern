import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DeleteTeamDto } from './dto/delete-team.dto';
import { PagedDataQuery } from 'src/interface/tabular';
import { IndexTeamRequest } from './model';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('/create')
  @HttpCode(200)
  create(@Body() payload: CreateTeamDto) {
    return this.teamService.create(payload);
  }

  @Post('/index')
  @HttpCode(200)
  findAll(@Body() payload: PagedDataQuery<IndexTeamRequest>) {
    return this.teamService.findAll(payload);
  }

  @Get('/getDetail')
  findOne(@Query('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post('/update')
  @HttpCode(200)
  update(@Body() payload: UpdateTeamDto) {
    return this.teamService.update(payload);
  }

  @Post('/delete')
  @HttpCode(200)
  remove(@Body() payload: DeleteTeamDto) {
    return this.teamService.remove(payload.teamId);
  }

  @Get('/getTeamDropdown')
  getPositionDropdown() {
    return this.teamService.getDropdown();
  }
}
