import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DeletePositionDto } from './dto/delete-position.dto';
import { PagedDataQuery } from 'src/interface/tabular';
import { IndexPositionRequest } from './model';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/create')
  @HttpCode(200)
  create(@Body() payload: CreatePositionDto) {
    return this.positionService.create(payload);
  }

  @Post('/index')
  @HttpCode(200)
  findAll(@Body() payload: PagedDataQuery<IndexPositionRequest>) {
    return this.positionService.findAll(payload);
  }

  @Get('/getDetail')
  findOne(@Query('id') id: string) {
    return this.positionService.findOne(id);
  }

  @Post('/update')
  @HttpCode(200)
  update(@Body() payload: UpdatePositionDto) {
    return this.positionService.update(payload);
  }

  @Post('/delete')
  @HttpCode(200)
  remove(@Body() payload: DeletePositionDto) {
    return this.positionService.remove(payload.positionId);
  }

  @Get('/getPositionDropdown')
  getPositionDropdown() {
    return this.positionService.getDropdown();
  }
}
