import Table from './components/Table';
import { db } from './db/db';
export default function App() {
  const products = db.products;
  const tableTitle = {
    title: 'A completed data table was written in TypeScript',
    description:
      'The table has a custom pagination component, checkbox selection, and a custom search component. All of these features were written  logically instead of using libraries.',
  };
  return <Table products={products} tableTitle={tableTitle} />;
}
