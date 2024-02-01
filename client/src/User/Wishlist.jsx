import React from 'react'

function Wishlist({ currentUser }) {

    const mappedUserWishlist = currentUser.dinner_wishlist.map((item) => (
        <div>
            <h3>{item.title}</h3>
        </div>
    ))
    
    console.log(mappedUserWishlist)


  return (
    <div>
        <h1>Wishlist</h1>
        {mappedUserWishlist}
    </div>
  )
}

export default Wishlist