import React, {
  FC,
  useRef,
  useState,
  ChangeEvent,
  useLayoutEffect,
  useMemo,
} from 'react';
import { ITableProps } from './interface';
import { createUseStyles } from 'react-jss';
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';

// components
import TableTitle from './TableTitle';
import Row from './Row';
import SearchBar from '../SearchBar';

// logical functions:
import getProducts from '../utils/getProducts';

import { IProduct } from './interface';

// constants
import {
  PRODUCT_SORTING_CATEGORIES,
  SORT_DIRECTION,
  flipSortDirection,
} from '../utils/constants';

const headerRow = [
  {
    key: 'NAME',
    label: 'Name',
  },
  {
    key: 'PRICE',
    label: 'Price',
  },
  {
    key: 'AVAILABILITY',
    label: 'Inventory',
  },
  {
    key: 'CREATED_AT',
    label: 'Created At',
  },
  {
    key: 'DESCRIPTION',
    label: 'Description',
  },
  {
    key: 'CATEGORIES',
    label: 'Categories',
  },
];

const tableStyles = createUseStyles({
  dataTableWrapper: {
    textAlign: 'center',
    '& th': {
      cursor: 'pointer',
      height: '30px',
      padding: '10px',
      background: 'gray',
      '& .titleWrapper': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
      },
    },

    '& .sortingIcon': {
      height: '20px',
      width: 'auto',
      marginTop: '4px',
      marginLeft: '10px',
    },
  },
});

const Table: FC<ITableProps> = ({ products, tableTitle }): JSX.Element => {
  const classes = tableStyles({});
  // 1. create ref for check all box
  const checkRef = useRef<HTMLInputElement | null>(null);
  // 1.1 create ref for check all box
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  // 2. create selected rows
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // begin search + sort
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortCol, setSortCol] = useState<string>(
    PRODUCT_SORTING_CATEGORIES.NAME
  );
  const [sortDir, setSortDir] = useState<string>(SORT_DIRECTION.ASC);

  // default display products
  // Argument of type 'IProduct[] | undefined' is not assignable to parameter of type 'IProduct[]' ==> Fix by products!
  const displayProducts = products!?.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 || []
  );

  const finalDisplayProducts = useMemo(
    () => getProducts(displayProducts, searchTerm, sortCol, sortDir),
    [displayProducts, searchTerm, sortCol, sortDir]
  );

  const _handleOnChangeCheckAll = (e: ChangeEvent<HTMLInputElement>): void => {
    // check all box toggle
    setSelectedRows(
      e.target.checked ? finalDisplayProducts.map((p) => p.id) : []
    );

    if (isCheckedAll) {
      setIsCheckedAll(false);
    }
  };

  // Use to cache state change of SelectedRows, finalDisplayProducts and isCheckedAll
  // to avoid re-rendering of Table
  // this method also handles the check all box state in the search cases
  useLayoutEffect(() => {
    const isIndeterminate =
      selectedRows.length > 0 &&
      selectedRows.length < finalDisplayProducts.length;
    if (checkRef.current) {
      checkRef.current.indeterminate = isIndeterminate;
    }

    if (selectedRows.length === finalDisplayProducts.length) {
      if (checkRef.current) {
        checkRef.current.indeterminate = false;
      }
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
    // case selectedRows.length === 0 > finalDisplayProducts.length (search)
    if (selectedRows.length > finalDisplayProducts.length) {
      if (checkRef.current) checkRef.current.indeterminate = true;
    }
  }, [selectedRows, finalDisplayProducts, isCheckedAll]);

  const _handleOnChangeRow = (id: string): void => {
    selectedRows.includes(id)
      ? setSelectedRows(selectedRows.filter((s) => s !== id))
      : setSelectedRows([...selectedRows, id]);
  };

  const _handleChangeSort = (col: string): void => {
    type T = keyof typeof PRODUCT_SORTING_CATEGORIES;
    setSortCol(PRODUCT_SORTING_CATEGORIES[col as T]);
    setSortDir(flipSortDirection(sortDir));
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <TableTitle
        title={tableTitle.title}
        description={tableTitle.description}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Table */}

      <div className={`${classes.dataTableWrapper} dataTables_wrapper `}>
        <div className='datatable-scroll'>
          <table className='table datatable-sorting dataTable w-full'>
            <thead>
              <tr>
                <th style={{ width: '44px' }}>
                  <div
                    className='titleWrapper'
                    style={{
                      height: '100%',
                      paddingTop: '5px',
                    }}
                  >
                    <input
                      type='checkbox'
                      className='left-4 top-1/2 -mt-2 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 sm:left-6'
                      ref={checkRef}
                      checked={isCheckedAll}
                      onChange={(e) => _handleOnChangeCheckAll(e)}
                    />
                  </div>
                </th>
                {headerRow.map((col) => {
                  type T = keyof typeof PRODUCT_SORTING_CATEGORIES;
                  return (
                    <th key={col.key} className='text-left'>
                      <div
                        className='titleWrapper'
                        onClick={() => _handleChangeSort(col.key)}
                      >
                        <span>{col.label}</span>
                        {sortCol === PRODUCT_SORTING_CATEGORIES[col.key as T] &&
                        sortDir === SORT_DIRECTION.ASC ? (
                          <SortAscendingIcon className='sortingIcon' />
                        ) : (
                          <SortDescendingIcon className='sortingIcon' />
                        )}
                      </div>
                    </th>
                  );
                })}

                <th>
                  <div className='titleWrapper'>
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {finalDisplayProducts.map((product) => {
                const {
                  id,
                  name,
                  isAvailable,
                  createdAt,
                  description,
                  categories,
                  price,
                } = product;
                const isRowSelected = selectedRows.includes(id);

                return (
                  <React.Fragment key={product.id}>
                    <Row
                      id={id}
                      name={name}
                      isAvailable={isAvailable}
                      createdAt={createdAt}
                      description={description}
                      categories={categories}
                      isRowSelected={isRowSelected}
                      handleOnChangeRow={() => _handleOnChangeRow(id)}
                      price={price}
                    />
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <p> this is pagination</p>
      </div>
    </div>
  );
};

export default Table;
