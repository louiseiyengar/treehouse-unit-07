import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './css/index.css';
import App from './components/App';
import Footer from './components/Footer';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" 
        render={ (props) => <App {...props} />} />
    <Route component={Footer} />
  </BrowserRouter>, document.getElementById('root')
);
