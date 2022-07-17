# [Live Link](https://strong-platypus-434616.netlify.app/)

# Overview

```
src
├─ components
│  ├─ Pagination
│  │  ├─ Pagination.tsx
│  │  ├─ index.ts
│  │  └─ interface.ts
│  ├─ SearchBar
│  │  ├─ SearchBar.tsx
│  │  └─ index.ts
│  ├─ Table
│  │  ├─ Row.tsx
│  │  ├─ Table.tsx
│  │  ├─ TableTitle.tsx
│  │  ├─ index.ts
│  │  └─ interface.ts
│  └─ utils
│     ├─ constants.ts
│     └─ getProducts.ts
├─ db
│  └─ db.js
├─ hooks
│  └─ usePagination.ts
├─ App.tsx
├─ index.css
├─ index.tsx
└─ module-name.d.ts

```

## Working with a data table

**An application made by logic - reduced libraries and components.**

- An application that can be used to create a data table.

- Search + sort + filter. Please play with search and check boxes. Enjoy!

- Pagination component

- Update checkbox below

```js
// default display products
  // Argument of type 'IProduct[] | undefined' is not assignable to parameter of type 'IProduct[]' ==> Fix by products!

  useEffect(() => {
    const displayProducts = products!?.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 || []
    );
    setRawData(displayProducts);
  }, [products]);

  const _handleDeletedRows = (id: string): void => {
    const newArr = rawData.filter((s) => s.id !== id);
    setRawData(newArr);
  };

  const finalDisplayProducts = useMemo(
    () => getProducts(rawData, searchTerm, sortCol, sortDir),
    [rawData, searchTerm, sortCol, sortDir]
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

    if (
      selectedRows.length > 0 &&
      selectedRows.length === finalDisplayProducts.length &&
      selectedRows.every((p) =>
        finalDisplayProducts.map((p) => p.id).includes(p)
      )
    ) {
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
```

- **Mock data**

```js
const categories = [
  'handmade',
  'toys',
  'clothing',
  'jewelry',
  'health',
  'food',
  'sports',
  'books',
  'movies',
  'music',
  'games',
  'tickets',
  'other',
];

function randomProductData() {
  const createAt = dayjs()
    .subtract(Math.floor(Math.random() * 100), 'day')
    .format('MMM/DD/YYYY');

  const newProduct = {
    id: uuidv4(),
    name: `${randomWords(5).join(' ')} `,
    isAvailable: !!Math.floor(Math.random() * 2),
    createdAt: createAt,
    description: randomWords(10).join(' '),
    attributes: randomWords(2).join(' '),
    categories: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 100),
  };
  return newProduct;
}

const productData = Array.from({ length: 10 }, () => randomProductData());
const db = {
  products: productData,
};
```

[React version](https://github.com/felix-le/react-completed-data-table)
