import React, { Component } from 'react';
import  {Route} from 'react-router-dom';

import SearchForm from './SearchForm';

class Header extends Component {

  getSearchText = () => {
    let searchText = "A Flickr Photo Gallery of ";

    const thisPath = this.props.location.pathname;

    switch(thisPath) {
      case '/button1':
        searchText += this.props.buttonText[0]
        break;
      case '/button2':
        searchText += this.props.buttonText[1]
        break;
      case '/button3':
        searchText += this.props.buttonText[2]
        break;
      default:
        if (thisPath.indexOf('/search/') > -1) { 
          searchText += thisPath.replace('/search/', '');
        } else {
          searchText = '';
        }
    }
    return searchText;
  }

  render () {
    this.getSearchText();
    return (
      <div className="header">
        <h2>{this.getSearchText()}</h2>
        <Route render={ (props) => <SearchForm {...props} search={this.props.search} /> } />
      </div>
    );
  } 
}

export default Header;