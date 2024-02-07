import React from 'react';
import { useSelector } from 'react-redux';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { useNavigate } from 'react-router';

function ShoppingList() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const data = React.useMemo(() => {
    if (currentUser && currentUser.dinner_wishlists) {
      const ingredients = Array.from(new Set(
        currentUser.dinner_wishlists.flatMap((wishlist) => {
          try {
            return JSON.parse(wishlist.ingredients);
          } catch (error) {
            console.error('Error parsing ingredients:', error);
            return [];
          }
        })
      ));
      return ingredients.map((ingredient, index) => ({ id: index, ingredient }));
    }
    return [];
  }, [currentUser]);

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
