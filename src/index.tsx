import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

import AppContextProvider from './components/appContext/appContext'

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
