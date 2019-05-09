import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import SendMessage from "./SendMessage";
import { ListItem, ListItemText, TextField, List } from "@material-ui/core";

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
  }

  getMessages = () => {
    firebase
      .database()
      .ref("messages/")
      .limitToLast(15)
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
      <ListItem>
        <ListItemText>{message.name + ": " + message.text}</ListItemText>
        <ListItemText>         
            {Math.floor((Date.now()-message.time)/60000) + " minutes ago"}
        </ListItemText>
      </ListItem>
    ));
  };

  render() {
    return (
      <div className="App">
        <h1>AnonChat</h1>
        <SendMessage sendmessage />
        <List>{this.renderMessages()}</List>
      </div>
    );
  }
}

export default App;