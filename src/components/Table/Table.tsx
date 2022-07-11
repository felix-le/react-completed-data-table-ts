import { FC } from 'react';
import { ITableProps } from './interface';
import { createUseStyles } from 'react-jss';
// components
import TableTitle from './TableTitle';

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
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <TableTitle
        title={tableTitle.title}
        description={tableTitle.description}
      />
      <h2>This is search bar place</h2>
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
                    />
                  </div>
                </th>
                <th>
                  <div className='titleWrapper'>
                    <span>Name</span>
                  </div>
                </th>

                <th>
                  <div className='titleWrapper'>
                    <span>Inventory</span>
                  </div>
                </th>

                <th>
                  <div className='titleWrapper'>
                    <span>Created At</span>
                  </div>
                </th>
                <th>
                  <div className='titleWrapper'>
                    <span>Description</span>
                  </div>
                </th>

                <th>
                  <div className='titleWrapper'>
                    <span>Category</span>
                  </div>
                </th>

                <th>
                  <div className='titleWrapper'>
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>this is body</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p> this is pagination</p>
      </div>
    </div>
  );
};

export default Table;
