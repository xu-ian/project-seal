import React from 'react';
import axios from 'axios';
import {Paper, TextField, Button, 
  Card, CardHeader, Avatar, CardActionArea} from '@material-ui/core';
import {Link, Switch,
  Route, BrowserRouter as Router} from 'react-router-dom';
import MessageList from './MessageList.js';

export default class FriendList extends React.Component{
    
  constructor(props){
    super(props);
    this.state = {
      contacts:[{name:"Bob"},{name:"Sally"}],//Placeholder names
      contactnum:"",
      value:"",
      rendered:true//Set to false after componentDidMount finishes.
    }
    this.formatContacts = this.formatContacts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
  }

  componentDidMount(){
    //Calls axios to get a list of all contacts for this user
    axios.get("http://localhost:5000/messages/getContacts/" 
       +/*window.localStorage.getItem("userId")||*/"60bf7c66da6e78b534ed1a8e").then(res => {
      this.setState({contacts:res.data, rendered:true});
      this.formatContacts(res.data);
    });
  }

  formatContacts(data){
    let contactArray = [];
    for(let i = 0; i < data.length; i++){
      if(data[i].relation[0] === "60bf7c66da6e78b534ed1a8e"/*window.localStorage.getItem("userId")||*/) {
        contactArray.push({name:data[i].relation[1]});
      }
      else{
        contactArray.push({name:data[i].relation[0]});
      }
    }
    this.setState({contacts:contactArray});
  }

  handleChange(event){
    this.setState({value:event.target.value});
  }

  renderContacts(){
    let contacts = [];
    for(let i = 0; i < this.state.contacts.length; i++){
      contacts.push(
        <Card>
          <CardActionArea onClick={() =>{
            this.setState({contactnum:i});
          }}>
            <Link style={{ textDecoration: 'none', color:'Black' }} 
             to={{pathname:"friendId"}}>
              <CardHeader
               avatar={<Avatar>{/*this.state.contacts[i].name[0]*/"?"}</Avatar>}
               title={this.state.contacts[i].name}
              />
            </Link>
          </CardActionArea>
        </Card>
      );
    }
    return contacts;
  }

  render(){
    if(!this.state.rendered){
      return(<div>Loading...</div>);
    }
    return(
      <Router>
        <Switch>
          <Route path="/friendlist/home">
            <div>
              <h1 style={{margin:"5px"}}>Contacts</h1>
              <hr/>
              {this.renderContacts()}
            </div>
          </Route>
          <Route path="/friendlist/friendid">
            <MessageList contact={this.state.contacts[this.state.contactnum]}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}