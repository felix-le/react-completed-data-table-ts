export interface IProduct {
  id: string;
  name: string;
  isAvailable: boolean;
  createdAt: string;
  description?: string;
  attributes?: string;
  categories?: string;
  actions?: () => void;
  isRowSelected?: boolean;
  handleOnChangeRow?: () => void;
}

export interface ITableTitle {
  title: string;
  description?: string | undefined;
}

export interface ITableProps {
  products?: IProduct[];
  tableTitle: ITableTitle;
}
