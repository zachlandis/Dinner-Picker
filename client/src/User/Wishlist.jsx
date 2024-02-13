import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router';
import { fetchWishlist, removeFromWishlist } from "../Redux/Actions/wishlistActions.jsx";

function Wishlist({ currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const data = useSelector(state => state.wishlist.wishlist); 

  useEffect(() => {
    dispatch(fetchWishlist(currentUser.id));
  }, [dispatch, currentUser.id]);

  useEffect(() => {
    setWishlist(data || []);
  }, [data]);

  useEffect(() => {
    const filtered = wishlist.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWishlist(filtered);
  }, [wishlist, searchTerm]);

  const removeItemFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(currentUser.id, itemId));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedWishlist = filteredWishlist.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className='centered-content'>
      <h3>Wishlist</h3>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search wishlist...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className='wishlist-table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>
              Title {sortConfig.key === 'title' && (
                sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedWishlist.map(item => (
            <tr key={item.id}>
              <td>
                <a
                  href="#"
                  className="recipe-title"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/recipe/${item.recipe_id}`);
                  }}
                >
                  {item.title}
                </a>
              </td>
              <td>
                <div className="remove-button-container dinner-wishlist-cell">
                  <button
                    className="remove-button"
                    onClick={() => removeItemFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Wishlist;
