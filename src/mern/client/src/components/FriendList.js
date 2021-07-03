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
      contacts:[],
      contactnum:"",
      value:"",
      rendered:false
    }
    this.formatContacts = this.formatContacts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
  }

  componentDidMount(){
    //Calls axios to get a list of all contacts for this user
    axios.get("http://localhost:5000/messages/getContacts/" 
       +/*window.localStorage.getItem("userId")||*/"60deb4b6e4ecc906340671a6").then(res => {
      this.setState({rendered:true});
      this.formatContacts(res.data);
    });
  }

  formatContacts(data){
    let contactArray = [];
    for(let i = 0; i < data.length; i++){
      if(data[i].relation[0] === "60deb4b6e4ecc906340671a6"/*window.localStorage.getItem("userId")||*/) {
        axios.get("http://localhost:5000/messages/username/"+data[i].relation[1])
          .then(res => {
            contactArray.push({name:res.data, id:data[i].relation[1]});
            this.setState({contacts:contactArray});
          })
          .catch(err =>{alert(err)});
      }
      else{
        axios.get("http://localhost:5000/messages/username/"+data[i].relation[0])
          .then(res => {
            contactArray.push({name:res.data, id:data[i].relation[0]});
            this.setState({contacts:contactArray});
          })
          .catch(err =>{alert(err)});
      }
    }
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
               avatar={<Avatar>{this.state.contacts[i].name[0]}</Avatar>}
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