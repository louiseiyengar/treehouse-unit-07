import React, { Component } from 'react';

class Nav extends Component {
  render () {
    return (
      <nav className="main-nav">
      <ul>
        <li><a href='puddlie'>Lion Cubs</a></li>
        <li><a href='wuddlie'>Tiger Cubs</a></li>
        <li><a href='muddlie'>Bear Cubs</a></li>
      </ul>
      </nav>
    );
  }
}

export default Nav;