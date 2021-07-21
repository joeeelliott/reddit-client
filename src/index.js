import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; 
import { store } from './app/store';


// installs font awesome globally in the App 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

// any fab icons need to go in here 
import { faBars } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faBars)   // any solid icons 'fas' go in here

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();