import React, { Component } from "react";
import firebase from "firebase";

class SendMessage extends Component {
  state = {
    text: "",
    name: "Anonymous"
  };
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleTextSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      return false;
    }
    this.pushDB(this.state.text, this.state.name);
    this.setState({
      text: ""
    });
  };
  pushDB = (message, username) => {
    firebase
      .database()
      .ref("messages/")
      .push({
        text: message,
        name: username,
        time: Date.now().toString()
      });
  };
  render() {
    return (
      <div>
        <form>
          <label>Name: </label>
          <input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
        </form>
        <form onSubmit={this.handleTextSubmit}>
          <label>Enter message: </label>
          <input
            type="text"
            onChange={this.handleTextChange}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}
export default SendMessage;