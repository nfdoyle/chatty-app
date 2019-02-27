import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList.jsx';



class Message extends Component {
  render() {
    if (this.props.type == 'incomingMessage'){
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else if (this.props.type == 'incomingNotification'){
      return (
        <div className="message system">
          {this.props.content} changed their name to {this.props.username}.
        </div>
      );
    } else {
      console.log('Type error!');
      return null;
    }
    
  }
}
export default Message;

