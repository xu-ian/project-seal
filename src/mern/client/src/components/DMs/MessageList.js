import React from 'react';
import axios from 'axios';
import MessageBox from './MessageBox.js';
import MessageInput from './MessageInput.js';
import {Paper, Button, CardHeader, Avatar} from '@material-ui/core';
import './MessageList.css';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default class MessageList extends React.Component {

    constructor(props){
        super(props);
        if(this.props.contact){
            window.localStorage.setItem("uid", this.props.contact.id);
            window.localStorage.setItem("uname", this.props.contact.name);
        }
        const date = new Date();
        this.state = {
            name:window.localStorage.getItem("uname"),
            user:window.localStorage.getItem("uid"),
            messages:[{body:"Hello", date:"09/01/2021", change:"false", mine:"true"},
            {body:"Hello", date:"09/01/2021", change:"false", mine:"false"}],
            value:"",
            time:date,
            timer:date.valueOf(),
            rendered:"false"
        };
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount(){
        this.interval = setInterval(() => {axios.get("http://localhost:5000/messages/getMessages/" 
        +(window.localStorage.getItem("userId")||"60deb4b6e4ecc906340671a6")+ "/" 
        + this.state.user).then(res => {
            this.setState({messages:res.data.conversation || res.data});
            this.setState({rendered:"true"});
        });}, 1000);
        
    }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    showMessage(){
        let messages = [];
        let mes = "";
        if(this.state.rendered === "true"){
        for(let i = 0; i < this.state.messages.length; i++){
            if(this.state.messages[i].author === window.localStorage.getItem("userId")){
                mes = this.state.messages[i];
                messages.push(
                    <div style={{width:"45%", left:"54%", position:"relative", margin:"2px"}}>
                        <MessageBox body={mes.content}  
                          date={mes.updatedAt} 
                          change={mes.createdAt !== mes.updatedAt} 
                          mine={mes.author === window.localStorage.getItem("userId")}
                          id={mes._id}/>
                    </div>
                );
            }
            else{
                mes = this.state.messages[i];
                messages.push(
                    <div style={{width:"45%", left:"1%", position:"relative", margin:"2px"}}>
                        <MessageBox body={mes.content}  
                          date={mes.updatedAt} 
                          change={mes.createdAt !== mes.updatedAt} 
                          mine={mes.author === window.localStorage.getItem("userId")}
                          id={mes._id}/>
                    </div>
                );
            }
        }
        }
        return messages;
    }

    render(){
        if(this.state.rendered === "false"){
            return(<div>Loading...</div>);
        }
        else{
            return(
                <div style={{top:"1%", position:"relative"}}>
                    <Paper style={{width:"90%", left:"4%", position:"relative", 
                      "font-size":"35px", margin:"10px"}}>
                        <CardHeader 
                          avatar={<Avatar>{this.state.name[0]}</Avatar>}
                          title={this.state.name}
                          action={
                            <Link style={{ textDecoration: 'none', color:'Black' }} 
                              to={{pathname:"home"}}>
                                <Button size="large" style={{float:"right"}}>
                                    <ArrowBackIcon />
                                </Button>
                            </Link>
                          }
                        />
                    </Paper>
                    <Paper className="MessageList" style={{height:"500px", width:"90%", 
                      top:"5%", left:"5%", "-ms-overflow-style":"none",
                      "scrollbar-width": "none", "overflow":"scroll", position:"relative"}}>
                        {this.showMessage()}
                    </Paper>
                    <MessageInput />
                </div>
            );
        }
    }
}