import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import randomWords from 'random-words';

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
export { db };
