import React, { Component } from 'react';
import SearchForm from './SearchForm';

class Header extends Component {
  render () {
    return (
      <div className="header">
        <h2>This is my React App</h2>
        <SearchForm />
      </div>

    );
  } 
}

export default Header;