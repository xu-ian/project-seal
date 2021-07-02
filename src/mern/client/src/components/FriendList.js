import React from 'react';
import {Paper, TextField, Button, 
  Card, CardHeader, Avatar, CardActionArea} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Link, Switch,
  Route, BrowserRouter as Router} from 'react-router-dom';
import MessageList from './MessageList.js';

export default class FriendList extends React.Component{
    
    constructor(props){
      super(props);
      this.state = {
        contacts:[{name:"Bob"},{name:"Sally"}],//Placeholder names
        contactnum:"",
        value:""
      }
      this.handleChange = this.handleChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.renderContacts = this.renderContacts.bind(this);
      this.addContact = this.addContact.bind(this);
    }

    componentDidMount(){
      //new Notification("Loads all contacts");
      //Calls axios to get a list of all contacts
      //axios.get("url").then(res => {
      //  this.setState({contacts:res.data});
      //});
    }

    handleChange(event){
      this.setState({value:event.target.value});
    }

    onClick(){
      //new Notification("Go to page");
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
          </Card>);
      }
      return contacts;
    }

    addContact(event){
      let current = this.state.contacts;
      /*axios.get("Get User URL", {user:event.target.value}).then(
        res => {
          current.push(res.data);
          this.setState({contacts:current});
          window.refresh();
        }
      )*/
      //new Notification(this.state.value);
      current.push({name:this.state.value});
      this.setState({contacts:current});
    }

    render(){
        return(
          <Router>
            <Switch>
              <Route path="/friendlist/home">
            <div>
              <h1 style={{margin:"5px"}}>Contacts</h1>
              <hr/>
              {this.renderContacts()}
              <Paper style={{top:"10%", width:"90%", left:"4%", margin:"10px", position:"relative"}}>
                <form noValidate autoComplete="off">
                  <div>
                    <TextField multiline id="outlined-basic" placeholder="Paste ID of contact here"
                      style={{width:"90%", position:"relative"}} value={this.state.value}
                      onChange={this.handleChange}/>
                    <Button size="large" variant="contained" onClick={this.addContact}
                     style={{margin:"8px", right:"7px", position:"relative", float:"right"}}>
                      <PersonAddIcon/>
                    </Button>
                  </div>
                </form>
              </Paper>
            </div>
            </Route>
            <Route path="/FriendList/friendId">
              <MessageList contact={this.state.contacts[this.state.contactnum]}/>
            </Route>
            </Switch>
          </Router>
        );
      }
}