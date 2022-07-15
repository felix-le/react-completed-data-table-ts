const PRODUCT_SORTING_CATEGORIES = {
  NAME: 'name',
  PRICE: 'price',
  AVAILABILITY: 'isAvailable',
  CREATED_AT: 'createdAt',
  DESCRIPTION: 'description',
  ATTRIBUTES: 'attributes',
  CATEGORIES: 'categories',
};

const SORT_DIRECTION = {
  ASC: 'ASCENDING',
  DESC: 'DESCENDING',
};

const ROW_PER_PAGE_DEFAULT = 10;

const flipSortDirection = (oldDirection: string) => {
  return oldDirection === SORT_DIRECTION.ASC
    ? SORT_DIRECTION.DESC
    : SORT_DIRECTION.ASC;
};

export {
  PRODUCT_SORTING_CATEGORIES,
  SORT_DIRECTION,
  ROW_PER_PAGE_DEFAULT,
  flipSortDirection,
};
