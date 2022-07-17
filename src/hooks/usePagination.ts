import { useState, useEffect } from 'react';

const usePaginationParams = (listLength: number = 0) => {
  const [currentPage, setCurrentPage] = useState(1);

  // If you want to create a state for choosing the number of items per page

  const [rowsPerPage] = useState(3);

  // reset pagination when list length changes: especially when list shrinks by being filtered, searched, etc.

  useEffect(() => {
    setCurrentPage(1);
  }, [listLength]);

  const handleChangePage = (e: any, newPage: number): void => {
    e.preventDefault();
    setCurrentPage(newPage);
  };

  // const handleChangeRowsPerPage = (event: any) => {
  //   setRowsPerPage(event.target.value);
  //   setCurrentPage(1);
  // };

  return {
    currentPage,
    rowsPerPage,
    handleChangePage,
  };
};
export default usePaginationParams;
