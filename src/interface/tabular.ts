import { ApiProperty } from '@nestjs/swagger';

export class PagedDataQuery<T> {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  search: T;
}

export class PagedDataResult<T> {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  rowCount: number;

  @ApiProperty()
  data: T[];
}
