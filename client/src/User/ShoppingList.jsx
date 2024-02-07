import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';

function ShoppingList({ randomizedMenu }) {
  const data = React.useMemo(() => {
    if (randomizedMenu) {
      const ingredients = randomizedMenu.reduce((acc, dinner) => {
        if (dinner.ingredients) {
          acc.push(...JSON.parse(dinner.ingredients));
        }
        return acc;
      }, []);
      const uniqueIngredients = [...new Set(ingredients)];
      return uniqueIngredients.sort().map((ingredient, index) => ({ id: index, ingredient }));
    }
    return [];
  }, [randomizedMenu]);

  const columns = React.useMemo(() => [
    {
      Header: 'Ingredient',
      accessor: 'ingredient',
    },
    {
      Header: 'Remove',
      id: 'remove',
      Cell: ({ row }) => (
        <div className="remove-button-container">
          <button
            className="remove-button"
            onClick={() => console.log(`Remove ${row.original.ingredient} from Shopping List`)}
          >
            Remove
          </button>
        </div>
      ),
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div className='centered-content'>
      <h3>Shopping List</h3>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search ingredients...'
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div className='wishlist-table-container'>
        <table {...getTableProps()} className='wishlist-table'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoppingList;
