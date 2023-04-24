import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App';

import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from './components/shared/ScrollToTop';



ReactDOM.render(
  <React.StrictMode>

    <Router>
      
      <ScrollToTop />

      <App />
      
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);