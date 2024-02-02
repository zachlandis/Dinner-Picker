import React from 'react';
import { useSelector } from 'react-redux';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';

function Wishlist() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const data = React.useMemo(() => currentUser.dinner_wishlists, [currentUser.dinner_wishlists]);

  const columns = React.useMemo(() => [
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Ingredients',
      accessor: 'ingredients',
    },
    {
      Header: 'Controls'
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
    <div>
      <h1>Wishlist</h1>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search wishlist...'
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
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
  );
}

export default Wishlist;
