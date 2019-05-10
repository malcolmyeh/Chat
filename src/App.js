import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import SendMessage from "./SendMessage";

class App extends Component {
  state = {
    messages: []
  };
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBQ54OB7Rtu3OAh32yqQvnELLvGC3QiYT8",
      authDomain: "anon-chat-23407.firebaseapp.com",
      databaseURL: "https://anon-chat-23407.firebaseio.com",
      projectId: "anon-chat-23407",
      storageBucket: "anon-chat-23407.appspot.com",
      messagingSenderId: "531896225805"
    };
    firebase.initializeApp(config);
    this.getMessages();
    this.interval = setInterval(() => this.renderMessages(), 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getMessages = () => {
    firebase
      .database()
      .ref("messages/")
      .limitToLast(9)
      .on("value", snapshot => {
        let newMessages = [];
        snapshot.forEach(child => {
          var message = child.val();
          newMessages.push({
            id: child.key,
            text: message.text,
            name: message.name,
            time: message.time
          });
        });
        this.setState({ messages: newMessages });
      });
  };

  renderMessages = () => {
    return this.state.messages.map(message => (
      <div>
        <p align="left">{message.name + ": " + message.text}</p>
        <p align="right">
          {"sent " +
            Math.floor((Date.now() - message.time) / 1) + //divide 60000
            " minutes ago"}
        </p>
      </div>
    ));
  };

  render() {
    return (
      <div className="App">
        <h1>Anonymous Chatroom</h1>
        {this.renderMessages()}
        <SendMessage sendmessage />
      </div>
    );
  }
}

export default App;