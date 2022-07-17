export interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  handleChangePage: (e: any, page: number) => void;
}
