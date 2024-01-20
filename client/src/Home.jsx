import React, {useContext} from 'react'
import { UserContext } from './UserContext';


function Home() {
    const { currentUser } = useContext(UserContext);

    console.log(currentUser)

  return (
    <div>
        <h1>Welcome, {currentUser.email}!</h1>
    </div>
  )
}

export default Home