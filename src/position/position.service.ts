import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from 'src/entities/Position';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagedDataQuery, PagedDataResult } from 'src/interface/tabular';
import { IndexPositionRequest, IndexPositionResponse } from './model';
import { DropdownModel } from 'src/interface/dropdown';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(position: CreatePositionDto) {
    const result = await this.positionRepository.save({
      name: position.name,
      isEnable: 1,
    });
    return result.positionId;
  }

  async findAll(query: PagedDataQuery<IndexPositionRequest>) {
    const num = query.pageSize * query.pageIndex;

    const positionList = await this.positionRepository.find({
      take: query.pageSize,
      skip: num,
      where: {
        name: query.search.text,
        isEnable: 1,
      },
    });

    const result: PagedDataResult<IndexPositionResponse> = {
      data: positionList.map<IndexPositionResponse>((item) => ({
        name: item.name,
        positionId: item.positionId,
      })),
      rowCount: positionList.length,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
    };
    return result;
  }

  async findOne(positionId: string) {
    const position = await this.positionRepository.findOneBy({
      positionId: positionId,
    });
    return position;
  }

  async update(updatePositionDto: UpdatePositionDto) {
    const position = await this.positionRepository.findOneBy({
      positionId: updatePositionDto.positionId,
    });
    position.name = updatePositionDto.name;
    const result = await this.positionRepository.save(position);

    return result.positionId;
  }

  async remove(positionId: string) {
    const position = await this.positionRepository.findOneBy({
      positionId: positionId,
    });
    position.isEnable = 0;
    const result = await this.positionRepository.save(position);

    return result.positionId;
  }

  async getDropdown() {
    const positionList = await this.positionRepository.findBy({
      isEnable: 1,
    });

    return positionList.map<DropdownModel>((item) => ({
      text: item.name,
      value: item.name,
    }));
  }
}
