// name: `${randomWords(5).join(' ')} `,
// isAvailable: !!Math.floor(Math.random() * 2),
// createdAt: createAt,
// description: randomWords(10).join(' '),
// attributes: randomWords(2).join(' '),
// categories: categories[Math.floor(Math.random() * categories.length)],

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

const flipSortDirection = (oldDirection) => {
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
