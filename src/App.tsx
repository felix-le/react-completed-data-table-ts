import Table from './components/Table';
import { db } from './db/db';
export default function App() {
  const products = db.products;
  return <Table products={products} />;
}
