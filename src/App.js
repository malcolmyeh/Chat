import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import { ListItem, ListItemText, TextField, List } from "@material-ui/core"


class App extends Component {
 state = {
   text: "",
   name: "Anonymous",
   messages: []
 }
  componentDidMount(){
   var config = {
     apiKey: "AIzaSyBQ54OB7Rtu3OAh32yqQvnELLvGC3QiYT8",
     authDomain: "anon-chat-23407.firebaseapp.com",
     databaseURL: "https://anon-chat-23407.firebaseio.com",
     projectId: "anon-chat-23407",
     storageBucket: "anon-chat-23407.appspot.com",
     messagingSenderId: "531896225805"
   };
   firebase.initializeApp(config);
   this.getMessages()
 }

 onSubmit = event => {
   if (event.charCode === 13 && this.state.text.trim() !== ""){ //if enter
     console.log(this.state.text)
     this.setState({ text: ""})
     this.pushDB(this.state.text, this.state.name)

   }
 }
  pushDB = (message, username) => {
   firebase.database().ref("messages/").push({
     text: message,
     name: username,
     time: Date(Date.now())
   })
 }

 getMessages = () => {
   firebase.database().ref("messages/").limitToLast(15).on("value", snapshot =>{
     let newMessages = []
     snapshot.forEach(child => {
       var message = child.val()
       newMessages.push({ id: child.key, text: message.text, name: message.name, time: message.time})
     })
     this.setState({messages: newMessages})
   })
 }

 renderMessages = () => {
   return this.state.messages.map(message => (
     <ListItem>
       <ListItemText>
         {message.name + ": " + message.text}    
       </ListItemText>
       <ListItemText>
       {"sent at " + message.time.toString().split(' ')[4]}
       </ListItemText>
     </ListItem>
   ))
 }
 handleNameChange = (e) => {
   this.setState({
       content: e.target.value
   })
 }
 handleSubmit = (e) => {
     e.preventDefault();
     this.props.addTask(this.state);
     this.setState({
         content: ''
     })
 }
 render() {
   return (
     <div className="App">
       <h1>AnonChat</h1>
       <TextField
         required
         label="Name"
         onChange={event => this.setState({ name: event.target.value })}
         value={this.state.name}
         style={{ width: "98vw", overflow: "hidden" }}
       />
       <List>
         {this.renderMessages()}
       </List>
       <TextField
         placeholder="Press ENTER to submit. "
         label="Enter text here"       
         multiline={true}
         onChange={event => this.setState({ text: event.target.value })}
         value={this.state.text}
         onKeyPress={this.onSubmit}
         style={{ width: "98vw", overflow: "hidden" }}
       /> 
     </div>
   )
 }
}

export default App;
