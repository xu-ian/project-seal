import React from 'react';
import MessageBox from './MessageBox.js';
//import MessageInput from './MessageInput.js';
import {Paper, TextField, Button, CardHeader, Avatar} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './MessageList.css';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default class MessageList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:this.props.contact.name|| "Default_Name",
            messages:[{body:"Hello", date:"09/01/2021", change:"false", mine:"true"}, 
            {body:"Hello", date:"09/01/2021", change:"false", mine:"false"}],
            value:""
        };
        this.addMessage = this.addMessage.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addMessage(){
        if(this.state.value !== ""){
            let temp = {body:this.state.value, date:"09/01/2021", change:"true", mine:"true"}
            let x = this.state.messages;
            x.push(temp);
            this.setState({messages:x});
            this.setState({value:""});
        }
        else{
            alert("Write a message before sending");
        }
    }

    showMessage(){
        let messages = [];
        for(let i = 0; i < this.state.messages.length; i++){
            if(this.state.messages[i].mine === "true"){
                messages.push(
                    <div style={{width:"45%", left:"54%", position:"relative", margin:"2px"}}>
                        <MessageBox body={this.state.messages[i].body}  
                          date={this.state.messages[i].date} 
                          change={this.state.messages[i].change} 
                          mine={this.state.messages[i].mine}/>
                    </div>
                );
            }
            else{
                messages.push(
                    <div style={{width:"45%", left:"1%", position:"relative", margin:"2px"}}>
                        <MessageBox body={this.state.messages[i].body}  
                          date={this.state.messages[i].date} 
                          change={this.state.messages[i].change} 
                          mine={this.state.messages[i].mine}/>
                    </div>
                );
            }
        }
        return messages;
    }

    handleChange(event){
        this.setState({value:event.target.value});
    }

    render(){
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
                    top:"5%", left:"5%", position:"relative"}}>
                    {this.showMessage()}
                </Paper>
                <Paper style={{top:"10%", width:"90%", left:"4%", margin:"10px", position:"relative"}}>
                <form noValidate autoComplete="off">
                    <div>
                    <TextField multiline id="outlined-basic" placeholder="Write your message here"
                      style={{width:"90%", position:"relative"}} value={this.state.value}
                      onChange={this.handleChange}/>
                    <Button size="large" variant="contained" onClick={this.addMessage}
                      style={{margin:"8px", right:"7px", position:"relative", float:"right"}}>
                          <SendIcon/>
                      </Button>
                      </div>
                </form>
                </Paper>
                {/*<MessageInput />*/}
            </div>
            );
    }
}