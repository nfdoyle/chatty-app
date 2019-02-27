import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class UserCounter extends Component {
  render() {
    //
    
    return (
      <div className='usercounter'>
        <h5>
          {this.props.usercount} Online
        </h5>
      </div>
    );
  }
}
export default UserCounter;
