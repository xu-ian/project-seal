import React from 'react';
import {Paper, TextField, Button} from '@material-ui/core';

export default class MessageInput extends React.Component{
    render(){
        return(
            <Paper style={{top:"10%", width:"90%", left:"5%", position:"relative"}}>
                <form noValidate autoComplete="off">
                    <div>
                    <TextField multiline id="outlined-basic" placeholder="Write your message here"
                      style={{width:"90%", position:"relative"}} />
                    <Button size="large" variant="contained" 
                      style={{top:"50%", left:"1%", position:"relative"}}>Send</Button>
                      </div>
                </form>
            </Paper>
        );
    }
}