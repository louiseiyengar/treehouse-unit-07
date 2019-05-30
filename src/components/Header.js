import React, { Component } from 'react';
import  {Route} from 'react-router-dom';

import SearchForm from './SearchForm';

class Header extends Component {
  
 // https://stackoverflow.com/questions/44634461/react-router-how-to-pass-match-object-into-a-component-declared-as-an-es6-cl
  render () {
    return (
      <div className="header">
        <h2>This is my React App</h2>
        <Route render={ (props) => <SearchForm {...props} search={this.props.search} /> } />

      </div>

    );
  } 
}

export default Header;