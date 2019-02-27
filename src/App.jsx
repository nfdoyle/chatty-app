import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import UserCounter from './UserCounter.jsx';

const appData = {
  currentUser: {name: "$init"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

class App extends Component {
  constructor() {
    super(); // SUPER IMPORTANT!  IF YOU LEAVE THIS OUT, STUFF BREAKS!

    this.state = {
      messages: [],
      usercount: 0,
      currentuser: appData.currentUser.name
    };
    this.addMessage = this.addMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  receiveMessage(message) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({ messages: newMessages });
  }

  changeCount(message){
    
    if (message.content === '+'){
      this.setState({
        usercount: (message.count),
      });
      
    }
    if (message.content === '-'){
      this.setState({
        usercount: (message.count),
      });
    }
  }

  addMessage(message) {
    let data = message;
    if (data.username == '' && data.content == ''){
      return
    }
    if (data.username == this.state.currentuser || this.state.currentuser == '$init') {
      if (data.username == ''){
        data.username = 'Anonymous';
      }
      this.state.currentuser = data.username;
      data.type = 'incomingMessage';
      this.chattySocket.send(JSON.stringify(data));
      
    }else if (data.content == ''){
      data.content = this.state.currentuser;
      this.state.currentuser = data.username;
      data.type = 'incomingNotification';
      this.chattySocket.send(JSON.stringify(data));
    }else {
      let contentTemp = data.content;
      data.content = this.state.currentuser;
      this.state.currentuser = data.username;
      data.type = 'incomingNotification';
      this.chattySocket.send(JSON.stringify(data));

      data = message;
      data.content = contentTemp;
      data.type = 'incomingMessage';
      this.chattySocket.send(JSON.stringify(data));

    }

  }

  componentDidMount() {
    const that = this;
    
    this.chattySocket = new WebSocket('ws://localhost:3001')

    this.chattySocket.onopen = function () {
    console.log('Connected to server');
    
    }
    this.chattySocket.onmessage = function (event) {
      const msg = JSON.parse(event.data);
      if (msg.type === 'incomingCount'){
        that.changeCount(msg);
      }else {
        that.receiveMessage(msg);
      }
      
      
      
    }
  }
  
  render() {
    return (
      <div className='app-container'>
      <UserCounter usercount={this.state.usercount} />
      <MessageList messages={this.state.messages} />
      <ChatBar addMessage={this.addMessage} currentuser={this.state.currentuser} />
      </div>
    );
  }
}
export default App;

