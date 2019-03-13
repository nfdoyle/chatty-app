import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserCounter from './UserCounter.jsx';

class NavBar extends Component {
  render() {
    //
    
    return (
      <nav className="navbar">
        <UserCounter usercount={this.props.usercount} />
        <a href="/" className="navbar-brand">Chatty</a>
        
      </nav>
    );
  }
}
export default NavBar;
