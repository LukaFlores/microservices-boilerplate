import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './styles/tailwind.css';
import { Auth } from './tools/authContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth>
        <App />
      </Auth>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
