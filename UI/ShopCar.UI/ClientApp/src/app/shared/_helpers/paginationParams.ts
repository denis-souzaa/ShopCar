export class PaginationParams {
  private searchTerm: any;

  constructor(
    private pageNumber: number = 0,
    private pageSize: number = 10,
    private sort: string = '',
  ) 
  {}

  get Page(): number {
    return this.pageNumber;
  }

  get Size(): number {
    return this.pageSize;
  }

  get Sort(): string {
    return this.sort;
  }

  setFilter(value: any) {
    this.searchTerm =  value;
    return this;
  }
}
