import { Controller, Get, Post, Body, Query } from '@nestjs/common';
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
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Post('/index')
  findAll(@Body() indexParam: PagedDataQuery<IndexPositionRequest>) {
    return this.positionService.findAll(indexParam);
  }

  @Get('/getDetail')
  findOne(@Query('id') id: string) {
    return this.positionService.findOne(id);
  }

  @Post('/update')
  update(@Body() updatePositionDto: UpdatePositionDto) {
    return this.positionService.update(updatePositionDto);
  }

  @Post('/delete')
  remove(@Body() deletePositionDto: DeletePositionDto) {
    return this.positionService.remove(deletePositionDto.positionId);
  }

  @Get('/getPositionDropdown')
  getPositionDropdown() {
    return this.positionService.getDropdown();
  }
}
