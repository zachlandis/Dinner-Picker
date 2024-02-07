import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { useNavigate } from 'react-router';
import { removeFromWishlist } from "../Redux/Actions/wishlistActions.jsx";

function Wishlist({ currentUser }) {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const [deletedItemId, setDeletedItemId] = useState(null);

  const data = React.useMemo(() => currentUser.dinner_wishlists, [currentUser.dinner_wishlists]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const removeItemFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(currentUser.id, itemId));
    setDeletedItemId(itemId);
  };

  const columns = React.useMemo(() => [
    {
      Header: 'Title',
      accessor: 'title',
      Cell: ({ row }) => (
        <a
          href="#"
          className="recipe-title"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/recipe/${row.original.recipe_id}`);
          }}
        >
          {row.values.title}
        </a>
      ),
    },
    {
      Header: 'Actions',
      id: 'actions',
      Cell: ({ row }) => (
        <div className="remove-button-container dinner-wishlist-cell">
          <button
            className="remove-button"
            onClick={() => removeItemFromWishlist(row.original.id)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ], [navigate]);

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
      <h3>Wishlist</h3>
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
            return deletedItemId === row.original.id ? null : (
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
