/*
    Treehouse FSJS - Project 7
    This project uses Reart and Rearch Router DOM 4 to display
    24 images received from the Flickr Photo API.

    The project contains 3 buttons and also allows users to input search terms
*/

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
    {/* Footer is rendered here so it appears outside the container div - so there will be sticky footer for 404 and loading pages */}
    <Route component={Footer} />
  </BrowserRouter>, document.getElementById('root')
);
