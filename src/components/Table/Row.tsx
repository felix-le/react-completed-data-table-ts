import { FC } from 'react';

import { IProduct } from './interface';

const Row: FC<IProduct> = ({
  id,
  name,
  isAvailable,
  createdAt,
  description,
  // attributes,
  categories,
  isRowSelected,
  price,
  handleOnChangeRow,
}): JSX.Element => {
  return (
    <tr>
      <td>
        <input
          type='checkbox'
          value={id}
          checked={isRowSelected}
          onChange={handleOnChangeRow}
        />
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{isAvailable ? 'Yes' : 'No'}</td>
      <td>{createdAt}</td>
      <td>{description}</td>
      <td>{categories}</td>
      {/* isCompleted */}
      <td>
        <button
          type='button'
          className='inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto'
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
