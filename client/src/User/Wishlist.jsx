import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

function Wishlist() {
    const { currentUser } = useContext(UserContext)

    // const mappedUserWishlist = currentUser.wishlist.map((item) => (
    //     <div>
    //         <h3>{item}</h3>
    //     </div>
    // ))


  return (
    <div>
        <h1>Wishlist</h1>
        {/* {mappedUserWishlist} */}
    </div>
  )
}

export default Wishlist