export interface PagedDataQuery<T> {
  pageIndex: number;
  pageSize: number;
  search: T;
}

export interface PagedDataResult<T> {
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  data: T[];
}
