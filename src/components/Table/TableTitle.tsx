import { FC } from 'react';

import { ITableTitle } from './interface';

const TableTitle: FC<ITableTitle> = ({ title, description }): JSX.Element => {
  return (
    <div className='sm:flex sm:items-center mt-5'>
      <div className='sm:flex-auto text-center'>
        <h1 className='text-xl font-semibold text-gray-900'>{title}</h1>
        <p className='mt-2 text-lg text-gray-700'>{description}</p>
      </div>
    </div>
  );
};
export default TableTitle;
