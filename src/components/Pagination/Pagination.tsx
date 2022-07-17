import React, { FC, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { IPaginationProps } from './interface';

const paginationStyles = createUseStyles({
  paginationWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',

    '& .isDisabled': {
      cursor: 'notAllowed',
      opacity: 0.5,
    },
    '& .highlightCurrent': {
      backgroundColor: '#4CAF50',
    },
    '& .inputPageNumber': {
      maxWidth: '150px',
    },
    '& button.disabled': {
      backgroundColor: '#f5f5f5',
      borderColor: ' #ddd',
      color: 'black',
    },
  },
});

const Pagination: FC<IPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  handleChangePage,
}): JSX.Element => {
  const classes = paginationStyles({});
  const [firstPage, setFirstPage] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const numberPage = Math.ceil(totalItems / itemsPerPage);
  const [goPage, setGoPage] = useState<number>(1);

  useEffect(() => {
    if (currentPage === 1) {
      setFirstPage(true);
    } else {
      setFirstPage(false);
    }
    if (currentPage === numberPage) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
  }, [currentPage, numberPage]);

  function _handleKeyDown(e: any) {
    const { value } = e.target;
    if (!value) {
      return;
    } else {
      if (value > 0 && value <= numberPage) {
        setGoPage(value);
      } else {
        setGoPage(numberPage);
      }
    }
  }
  function _handleKeyPress(e: any) {
    const code = e.keyCode || e.which;
    if (code === 13) {
      if (!goPage) {
        e.preventDefault();
      } else {
        handleChangePage(e, goPage);
        setGoPage(1);
      }
    }
  }
  return (
    <div
      className='card-footer bg-white d-sm-flex justify-content-sm-between align-items-sm-center mt-4'
      style={{ minHeight: '60px' }}
    >
      {numberPage > 1 ? (
        <>
          <div className='showingPage'>
            Page {currentPage} / {numberPage} Pages
          </div>
          <nav>
            <ul className={`${classes.paginationWrapper} pagination`}>
              <li className='page-item'>
                <button
                  onClick={(e) => handleChangePage(e, 1)}
                  className={`${
                    firstPage ? 'disabled' : null
                  } page-link inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto`}
                  disabled={firstPage ? true : false}
                >
                  First
                </button>
              </li>
              {currentPage > 1 ? (
                <>
                  <li className='page-item  mx-3'>
                    <button
                      onClick={(e) => handleChangePage(e, currentPage - 1)}
                      className='page-link inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto'
                    >
                      Back
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className='page-item  mx-3'>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className={`${
                        firstPage ? 'disabled' : null
                      } page-link inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto`}
                      disabled={firstPage ? true : false}
                    >
                      Back
                    </button>
                  </li>
                </>
              )}
              <li className='page-item'>
                <form noValidate>
                  <input
                    type='number'
                    className='page-link inputPageNumber'
                    placeholder={`${currentPage}/${numberPage}`}
                    onKeyPress={_handleKeyPress}
                    onChange={(e) => _handleKeyDown(e)}
                    value={goPage}
                  />
                </form>
              </li>
              {currentPage < numberPage ? (
                <>
                  <li className='page-item ml-3'>
                    <button
                      onClick={(e) => handleChangePage(e, currentPage + 1)}
                      className='page-link inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto'
                    >
                      Next
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className='page-item ml-3'>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className={`${
                        lastPage ? 'disabled' : null
                      } page-link inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto`}
                      disabled={firstPage ? true : false}
                    >
                      Next
                    </button>
                  </li>
                </>
              )}
              <li className='page-item ml-3 '>
                <button
                  onClick={(e) => handleChangePage(e, numberPage)}
                  className={`${
                    lastPage ? 'disabled' : null
                  } page-link inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto`}
                  disabled={firstPage ? true : false}
                >
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
};
export default Pagination;
