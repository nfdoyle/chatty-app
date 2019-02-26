import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const appData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
      currentuser: appData.currentUser
    };
    this.addMessage = this.addMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  receiveMessage(message) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({ messages: newMessages });
  }

  addMessage(message) {
    // const oldMessages = this.state.messages;
    // const newMessages = [...oldMessages, message];
    // this.setState({ messages: newMessages });
    this.chattySocket.send(JSON.stringify(message)); 
    console.log('data sent!');
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const that = this;
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    this.chattySocket = new WebSocket('ws://localhost:3001')

    this.chattySocket.onopen = function () {
    console.log('Connected to server');
    
    }
    this.chattySocket.onmessage = function (event) {
      console.log(JSON.parse(event.data));
      console.log('received success');
      console.log(this);
      that.receiveMessage(JSON.parse(event.data));
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          break;
        case "incomingNotification":
          // handle incoming notification
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }
  
  render() {
    return (
      <div className='app-container'>
      <MessageList messages={this.state.messages} />
      <ChatBar addMessage={this.addMessage} currentuser={this.state.currentuser} />
      </div>
    );
  }
}
export default App;

