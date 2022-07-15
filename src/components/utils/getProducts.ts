import { IProduct } from '../Table/interface';
import { PRODUCT_SORTING_CATEGORIES, SORT_DIRECTION } from './constants';

const {
  NAME,
  PRICE,
  AVAILABILITY,
  CREATED_AT,
  DESCRIPTION,
  ATTRIBUTES,
  CATEGORIES,
} = PRODUCT_SORTING_CATEGORIES;

const getSearchProducts = (products: IProduct[], searchTerm: string) => {
  if (!searchTerm) {
    return products;
  }

  return products.filter((p) => {
    return p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
};

const getSortedProducts = (
  products: IProduct[],
  sortCol: string,
  sortDirection: string
) => {
  if (!sortCol || !sortDirection) {
    return products;
  }
  return products.sort((a: any, b: any) => {
    // compare string > we use localeCompare to sort by alphabet
    // compare number > we use ascending order
    // compare boolean > we use sort(value => value ? 1 : -1)
    const { ASC } = SORT_DIRECTION;

    const aDate = a.createdAt;
    const bDate = b.createdAt;
    if (sortCol === NAME) {
      return sortDirection === ASC
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortCol === PRICE) {
      return sortDirection === ASC ? a.price - b.price : b.price - a.price;
    }
    // boolean  > we use sort(value => value ? 1 : -1)
    if (sortCol === AVAILABILITY) {
      const aValue = a.isAvailable ? 1 : -1;
      const bValue = b.isAvailable ? 1 : -1;
      return sortDirection === ASC ? aValue - bValue : bValue - aValue;
    }
    // date > we have to assign to new Date().getTime()
    if (sortCol === CREATED_AT) {
      return sortDirection === ASC
        ? new Date(aDate).getTime() - new Date(bDate).getTime()
        : new Date(bDate).getTime() - new Date(aDate).getTime();
    }
    if (sortCol === DESCRIPTION) {
      return sortDirection === ASC
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    }
    if (sortCol === ATTRIBUTES) {
      return sortDirection === ASC
        ? a.attributes.localeCompare(b.attributes)
        : b.attributes.localeCompare(a.attributes);
    }
    if (sortCol === CATEGORIES) {
      return sortDirection === ASC
        ? a.categories.localeCompare(b.categories)
        : b.categories.localeCompare(a.categories);
    }
    return products;
  });
};

const getProducts = (
  products: IProduct[],
  searchTerm: string,
  sortCol: string,
  sortDirection: string
) => {
  const searchProducts = getSearchProducts(products, searchTerm);
  const sortedProducts = getSortedProducts(
    searchProducts,
    sortCol,
    sortDirection
  );
  return sortedProducts;
};

export default getProducts;
