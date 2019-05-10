import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import SendMessage from "./SendMessage";

class App extends Component {
  state = {
    messages: [],
    date: new Date()
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
    this.interval = setInterval(() => this.updateClock(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  updateClock() {
    this.setState({
      date: new Date()
    });
  }
  getMessages = () => {
    firebase
      .database()
      .ref("messages/")
      .limitToLast(100)
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
        this.bottomSpan.scrollIntoView({ behavior: "smooth" })
      });
      
  };

  getTime = (currenttime, messagetime) => {
    if ((Math.floor((currenttime - messagetime) / 60000)) < 1){
      return " moments ago"
    } else if ((Math.floor((currenttime - messagetime) / 60000)) == 1){
      return 1 + " minute ago"
    } else if ((Math.floor((currenttime - messagetime) / 60000)) < 60){
      return (Math.floor((currenttime - messagetime) / 60000)) + " minutes ago"
    } else if ((Math.floor((currenttime - messagetime) / 3600000)) == 1){
    return 1 + "hour ago"
    } else if ((Math.floor((currenttime - messagetime) / 3600000)) < 25){
      return (Math.floor((currenttime - messagetime) / 3600000)) + " hours ago"
    }else if ((Math.floor((currenttime - messagetime) / 86400000)) == 1){
      return 1 + "hours ago"
    }else {
      return (Math.floor((currenttime - messagetime) / 86400000)) + " days ago"
    } 
  }

  renderMessages = () => {
    return this.state.messages.map(message => (
      <div>
        <p align="left">{message.name + ": " + message.text}</p>
        <p align="right">
          {"sent " + this.getTime (this.state.date, message.time)}
        </p>
      </div>
    ));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <div class="navbar">
            <a href="#" class="brand-logo">Anonymous Chatroom</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="https://github.com/malcolmyeh/Chat">Source Code</a></li>
            </ul>
          </div>
        </nav>
        <div>
          {/*<h2>Anonymous Chatroom</h2>*/}
          {this.renderMessages()}
          <SendMessage sendmessage />
        </div>
        <span ref={el => (this.bottomSpan = el)} />
      </div>
    );
  }
}
//comment
export default App;