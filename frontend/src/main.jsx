import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './scss/index.scss'
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId="724662923081-4f3im8rogkjjeaqlbhvep5l22608ab4t.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>,
)
