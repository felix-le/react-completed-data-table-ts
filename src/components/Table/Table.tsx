import React, { FC } from 'react';
import { ITableProps } from './interface';

const Table: FC<ITableProps> = ({ products }): JSX.Element => {
  console.log('🚀 ~ file: Table.tsx ~ line 5 ~ products', products);
  return <div>Table</div>;
};

export default Table;
