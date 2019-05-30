import React, { Component } from 'react';
import  {Route} from 'react-router-dom';

import SearchForm from './SearchForm';

class Header extends Component {
  
  getSearchText = () => {
    let searchText;
    const thisPath = this.props.location.pathname;

    switch(thisPath) {
      case '/button1':
        searchText = this.props.buttonText[0]
        break;
      case '/button2':
        searchText = this.props.buttonText[1]
        break;
      case '/button3':
        searchText = this.props.buttonText[2]
        break;
      default: 
        searchText = thisPath.replace('/search/', '');
    }
    return searchText;
  }

 // https://stackoverflow.com/questions/44634461/react-router-how-to-pass-match-object-into-a-component-declared-as-an-es6-cl
  render () {
    this.getSearchText();
    return (
      <div className="header">
        <h2>A Flicker Photo Gallery of {this.getSearchText()}</h2>
        <Route render={ (props) => <SearchForm {...props} search={this.props.search} /> } />
      </div>
    );
  } 
}

export default Header;