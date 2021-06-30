import React from 'react';
import axios from 'axios';
import MessageBox from './MessageBox.js';
import MessageInput from './MessageInput.js';
import {Paper, TextField, Button, CardHeader, Avatar} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './MessageList.css';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default class MessageList extends React.Component {

    constructor(props){
        super(props);
        if(!window.localStorage.getItem("uid")){
            window.localStorage.setItem("uid", this.props.contact.name);
        }
        const date = new Date();
        this.state = {
            user:window.localStorage.getItem("uid") || this.props.contact.name,
            messages:[{body:"Hello", date:"09/01/2021", change:"false", mine:"true"},
            {body:"Hello", date:"09/01/2021", change:"false", mine:"false"}],
            value:"",
            timer:date.valueOf(),
            rendered:"false"
        };
        this.addMessage = this.addMessage.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.post("http://localhost:5000/messages/getMessages", 
        {mid:"60bf7c66da6e78b534ed1a8e"/*window.localStorage.getItem("userId")||*/,
         uid:this.state.user}/*window.getItem("MessageUserID")*/).then(res => {
            this.setState({messages:res.data.conversation});
            this.setState({rendered:"true"});
        });
    }

    addMessage(){
        if(this.date.valueOf() >= parseInt(this.state.timer) + 20000){
            new Notification(this.date.valueOf());
            this.setState({timer:parseInt(this.state.timer) + 20000});
            axios.post("http://localhost:5000/messages/getMessages", 
        {mid:"60bf7c66da6e78b534ed1a8e"/*window.localStorage.getItem("userId")||*/,
         uid:this.state.user}/*window.getItem("MessageUserID")*/).then(res => {
            this.setState({messages:res.data.conversation});
            this.setState({rendered:"true"});
        });
        }
        if(this.state.value !== ""){
            let temp = {body:this.state.value, date:"09/01/2021", change:"true", mine:"true"}
            let x = this.state.messages;
            x.push(temp);
            this.setState({messages:x});
            this.setState({value:""});
            //Replace code above with below once implemented.
            /*
              axios.post("/MessagingBackend/sendMessage", {messageText:this.state.value, 
                recieverID:this.state.user, senderID: window.getItem("userID")});
            */
        }
        else{
            alert("Write a message before sending");
        }
    }

    showMessage(){
        let messages = [];
        let mes = "";
        if(this.state.rendered === "true"){
        for(let i = 0; i < this.state.messages.length; i++){
            if(this.state.messages[i].author === "60bf7c66da6e78b534ed1a8e"){
                mes = this.state.messages[i];
                messages.push(
                    <div style={{width:"45%", left:"54%", position:"relative", margin:"2px"}}>
                        <MessageBox body={mes.content}  
                          date={mes.updatedAt} 
                          change={mes.createdAt !== mes.updatedAt} 
                          mine={mes.author === "60bf7c66da6e78b534ed1a8e"}
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
                          mine={mes.author === "60bf7c66da6e78b534ed1a8e"}
                          id={mes._id}/>
                    </div>
                );
            }
        }
        }
        return messages;
    }

    handleChange(event){
        this.setState({value:event.target.value});
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
                          avatar={<Avatar>{this.state.user[0]}</Avatar>}
                          title={this.state.user}
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