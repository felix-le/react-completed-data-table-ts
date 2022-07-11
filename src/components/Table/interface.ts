export interface IProducts {
  id: string;
  name: string;
  isAvailable: boolean;
  createdAt: string;
  description: string;
  attributes: string;
  categories: string;
}

export interface ITableTitle {
  title: string;
  description?: string | undefined;
}

export interface ITableProps {
  products?: IProducts[];
  tableTitle: ITableTitle;
}
