import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList.jsx';



class Message extends Component {
  render() {
    return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
    );
  }
}
export default Message;

