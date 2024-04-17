import { Injectable } from '@nestjs/common';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { Position } from 'src/entities/Position';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PagedDataQuery, PagedDataResult } from 'src/interface/tabular';
import { DropdownModel } from 'src/interface/dropdown';
import { IndexPositionRequest, IndexPositionResponse } from './model';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(dto: CreatePositionDto) {
    const result = await this.positionRepository.save({
      name: dto.name,
      description: dto.description || null,
      isEnable: 1,
    });
    return result.positionId;
  }

  async findAll(query: PagedDataQuery<IndexPositionRequest>) {
    const num = query.pageSize * query.pageIndex;

    const _text = query.search.text
      ? ILike(`%${query.search.text}%`)
      : undefined;

    const positionList = await this.positionRepository.find({
      take: query.pageSize,
      skip: num,
      where: {
        name: _text,
        isEnable: 1,
      },
    });

    const result: PagedDataResult<IndexPositionResponse> = {
      data: positionList.map<IndexPositionResponse>((item) => ({
        name: item.name,
        positionId: item.positionId,
        description: item.description || null,
      })),
      rowCount: positionList.length,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
    };
    return result;
  }

  async findOne(id: string) {
    try {
      const position = await this.positionRepository.findOneByOrFail({
        positionId: id,
        isEnable: 1,
      });
      return position;
    } catch (error) {
      return error;
    }
  }

  async update(dto: UpdatePositionDto) {
    const position = await this.positionRepository.findOneByOrFail({
      positionId: dto.positionId,
      isEnable: 1,
    });

    position.name = dto.name;
    position.description = dto.description;

    const result = await this.positionRepository.save(position);

    return result.positionId;
  }

  async remove(id: string) {
    const position = await this.positionRepository.findOneByOrFail({
      positionId: id,
      isEnable: 1,
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
      value: item.positionId,
    }));
  }
}
