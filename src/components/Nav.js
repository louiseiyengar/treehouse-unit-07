import React from 'react';
import {
  NavLink
} from 'react-router-dom'

const Nav =(props) => (
    <nav className="main-nav">
      <ul>
        <li><NavLink exact to='/button1'>{props.buttonText[0]}</NavLink></li>
        <li><NavLink exact to='/button2'>{props.buttonText[1]}</NavLink></li>
        <li><NavLink exact to='/button3'>{props.buttonText[2]}</NavLink></li>
      </ul>
    </nav>
);

export default Nav;