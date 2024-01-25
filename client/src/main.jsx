import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './UserContext';
import { Provider } from 'react-redux'
import store from './Redux/Store.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>,
)
