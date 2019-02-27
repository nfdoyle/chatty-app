import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';



class NewMessageForm extends React.Component{

  render(){

    const onSubmit = (evt) => {
      evt.preventDefault();
      const newMessage = {};
      const newMessageContent = evt.target.elements.newMessage;
      const newMessageUser = evt.target.elements.userName;
  
      newMessage.username = newMessageUser.value;
      newMessage.content = newMessageContent.value;
      
      // Here, we call the function we were sent
      this.props.addMessage(newMessage);

      newMessageContent.value = '';
    };

    return (
      <form className="chatbar" onSubmit={onSubmit}>
        <input className="chatbar-username" name='userName' placeholder="Your Name (Optional)" />
        <input className="chatbar-message" name='newMessage' placeholder="Type a message and hit ENTER" />
        <button className="chatbar-submit" type='submit'></button>
      </form>
    );
  }
}

class ChatBar extends Component {
  render() {
    return (
    <footer className="chatbar">
      <NewMessageForm addMessage={this.props.addMessage} currentuser={this.props.currentuser} />
    </footer>
    );
  }
}
export default ChatBar;

