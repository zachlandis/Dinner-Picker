import React, { useState } from 'react'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div>
        <form>
            <input
                type='text'
                name='username'
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
           <input
                type='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Login" />

        </form>
    </div>
  )
}

export default Login