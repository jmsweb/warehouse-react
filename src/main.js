import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import App from './App';

// Who's going to enter our site? Copy paste url? This handles it.
async function loadUser() {
  const response = await fetch(process.env.WAREHOUSE_API + '/api/v1/auth/verify', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => response.json())
  .catch(error => console.log(error));
  if (!response || !response.success) {
    return null;
  }

  return {
    jwt: response.jwt,
    email: response.payload.email,
    id: response.payload.id,
    name: response.payload.name,
    admin: response.payload.admin
  }
}

const data = await loadUser();

(ReactDOM.createRoot(
  document.getElementById('app'))
).render(
  <React.StrictMode>
    <BrowserRouter>
      <App user={data}/>
    </BrowserRouter>
  </React.StrictMode>
);